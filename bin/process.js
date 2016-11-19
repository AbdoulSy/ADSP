/* jshint esversion: 6 */
const CDocParser = require('cdocparser');

const walk    = require('walk');
const fs      = require('fs');
const path    = require('path');
const _       = require('lodash');
const getEventsFn = require('./includes/get-events');
const getProcessDocumentsFn = require('./includes/get-processes');
const my      = require('../apps_wrapper/env/env');
const walker  = walk.walk("./apps_wrapper/projects/", { followLinks: true});
const MarklogicClient = require('marklogic');
//connecting to Marklogic
var db = MarklogicClient.createDatabaseClient(my.connection);
var qb = MarklogicClient.queryBuilder;
let connection = {db, qb};
console.log("\n CONNEXION TO MARKLOGIC ESTABLISHED");
var previousProcess;
var els;

//Gets the events from Marklogic's database
//see includes>get-events
getEventsFn(connection, els);
//gets the processed Documents from Marklogic's documents database
getProcessDocumentsFn(connection, previousProcess);

var resultsOfParsing = {};

//TODO: get the last result as json from Marklogic 


//trying to implement an idempotent method to preserve resources
//we store when the walk Has started to monitor the speed of the crawling
resultsOfParsing.walkStart = Date.now(); 

walker.on("directories", dirHandler);
walker.on("file", fileHandler);
walker.on("errors", errorsHandler); // plural
walker.on("end", endHandler);

resultsOfParsing.directories = [];
var d = resultsOfParsing.directories;
function dirHandler(root, dirStatsArray, next) {
	let theDir = {};
	theDir.root = root;
	theDir.dirs = _.map(dirStatsArray, function (dir) {
		return {
			name: dir.name,
			mtime: dir.mtime
		};
	});
	d.push(theDir);
	next();
}

function fileHandler(root, fileStat, next) {
  if(fileStat.name === ".DS_Store") {
     next();
     return;
  }
  fs.readFile(path.resolve(root, fileStat.name), "utf-8", function (err, buffer) {
    var ext = /.+?\.(.*)$/;
    var extension = fileStat.name.match(ext);
    console.log(extension);
    switch(extension[1]){
      case 'html':
	initiateCommentReader({
	  type: 'HTMLComment',
	  extractorOptions: {
           lineComment: false,
           blockComment: true,
           blockCommentStyle: '<!-- **',
          }, 
	  file: path.resolve(root, fileStat.name)
	}, buffer);
	break;
      default :	      
	initiateCommentReader({
	  type: 'JSComment',
          extractorOptions: {
            lineComment: true,
            blockComment: true,
            lineCommentStyle: '///',
            blockCommentStyle: '/**'
          },
	  file: path.resolve(root, fileStat.name)
	}, buffer);
    }
    next();
  });
}

function errorsHandler(root, nodeStatsArray, next) {
  console.log("error >>>>", root, nodeStatsArray, next);
  nodeStatsArray.forEach(function (n) {
    console.error("[ERROR] " + n.name);
    console.error(n.error.message || (n.error.code + ": " + n.error.path));
 });
  next();
}

resultsOfParsing.files = [];

function endHandler() {
  resultsOfParsing.walkEnd = Date.now();
  resultsOfParsing.walkTime = resultsOfParsing.walkEnd - resultsOfParsing.walkStart + "ms";
  console.log("all done");
  

  var documents = [
    { uri: '/ps/process.json',
      content: resultsOfParsing 
    }
  ];
  db.documents.write(documents)
  .result(function(response) {
    console.log("parsing results sent successfully");
    console.log('Loaded the following documents:');
    response.documents.forEach( function(document) {
      console.log('  ' + document.uri);
    });
  }, function (error) {
    console.log(JSON.stringify(error,null,2));
  });

  console.log(resultsOfParsing.directories);
  fs.watch(resultsOfParsing.directories[0].root, {},  function(eventType, filename)  {
      console.log(`event type is: ${eventType}`);
      let a = {
        ctime: Date.now(),
        eventType: eventType,
        filename: filename
       };
      if(!els) {
        
        els  = [];
	els.push(a);
	db.createCollection('events', els).result();
	
      } else {
        els.push(a);
	db.writeCollection('events', els).result();
      }

  });
  console.log("press ^C (Ctrl C) to quit");
}

function initiateCommentReader(opts, code) {

    var extractor = new CDocParser.CommentExtractor(function (line, arg2) {
      return {
        type: opts.type, 
        file: opts.file,
        line: arg2(0)

     };
    }, opts.extractorOptions );

    var parser = new CDocParser.CommentParser({
        _: {
  	  alias: {
	   todo: 'TODO'
         }
       },
       TODO: {
         parse: function(annotationLine, info, id) {
 	   return _.trimStart(annotationLine, ':');      
         },
         default: function() {
           return "Not Implemented";
         }      
       },
       milestone: {
         parse: function(line) {
	   return _.trimStart(line, ':');
	 },
	 default: function () {
	   return '--';
	 }
       },
       collabs: {
	  parse: function (line) {
	    return _.trimStart(line, ':').split(',');
	  },
	 default: function () {
	   return '--';
	 }
	},
	project: {
         parse: function (line) {
	    return _.trimStart(line, ':').split('/');
	  },	
	 default: function () {
	   return '--';
	 }
	},
	author: {
	 parse: function (annotationLine) {
	    return _.trimStart(annotationLine, ':');
	  },
	 default: function () {
	   return '--';
	 }
	}
    });

    var comments = extractor.extract(code);
    var parsedComments = parser.parse(comments);
    var ext = {};
    ext.author = '';
    ext.project = '';
    ext.milestone = '';
    ext.collabs = '';
    ext.file = opts.file;


    parsedComments.forEach(function(comment) {
	if(comment.milestone !== '--') {
	  ext.milestone = comment.milestone;
	}    
	if(comment.author !== '--') {
	  ext.author= comment.author;
	}    
	if(comment.project !== '--') {
	  ext.project= comment.project;
	}    
	if(comment.collabs !== '--') {
	  ext.collabs= comment.collabs;
	}   
	var a = _.extend(comment, ext);
        resultsOfParsing.files.push(a);
    });

	  }

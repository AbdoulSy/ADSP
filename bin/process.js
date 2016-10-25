var CDocParser = require('cdocparser');
var walk    = require('walk');
var fs      = require('fs');
var path    = require('path');
var _       = require('lodash');
var walker  = walk.walk("./projects", { followLinks: true});
var MarklogicClient = require('marklogic');
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/todos';

walker.on("file", fileHandler);
walker.on("errors", errorsHandler); // plural
walker.on("end", endHandler);


function fileHandler(root, fileStat, next) {
  fs.readFile(path.resolve(root, fileStat.name), "utf-8", function (err, buffer) {
    var ext = /.+?\.(.*)$/;
    var extension = fileStat.name.match(ext);
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
  nodeStatsArray.forEach(function (n) {
    console.error("[ERROR] " + n.name);
    console.error(n.error.message || (n.error.code + ": " + n.error.path));
 });
  next();
}

var resultsOfParsing = [];

function endHandler() {
  console.log("all done");

  resultsOfParsing.forEach(function(item){
     console.log(item.file, item.author, item.TODO, item.project, item.milestone, item.collabs);
  
  });
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
	var a = _.extend(comment,ext);
        resultsOfParsing.push(a);
    });

}

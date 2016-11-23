/* jshint esversion: 6 */

const walk    = require('walk');
const fs      = require('fs');
const _       = require('lodash');
const path    = require('path');
const watch   = require('node-watch');
const initiateCommentReader = require('./comment-reader.js');
let globals   = require('./globals.js');


function dirHandler(root, dirStatsArray, next) {
	console.log("<<dir>>>");
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

function errorsHandler(root, nodeStatsArray, next) {
  console.log("error >>>>", root, nodeStatsArray, next);
  nodeStatsArray.forEach(function (n) {
    console.error("[ERROR] " + n.name);
    console.error(n.error.message || (n.error.code + ": " + n.error.path));
 });
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
  });
  next();
}

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

  watch(resultsOfParsing.directories[0].root, function(eventType, filename)  {
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

var resultsOfParsing;
var d;
var db;
module.exports = {
    init: function (databaseClient) {
    
       db = databaseClient;
       resultsOfParsing = globals.resultsOfParsing;
       d = resultsOfParsing.directories;
       let walker  = walk.walk("./test-project", { followLinks: true});
       console.log("fiok>>", dirHandler);
       walker.on("directories", dirHandler);
       walker.on("file", fileHandler);
       walker.on("errors", errorsHandler); // plural
       walker.on("end", endHandler);
    }

};

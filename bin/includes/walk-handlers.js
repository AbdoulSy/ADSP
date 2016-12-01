/* jshint esversion: 6 */
const walk    = require('walk');
const fs      = require('fs');
const _       = require('lodash');
const path    = require('path');
const watch   = require('node-watch');
const leasotFn  = require('../leasot.js');
const initiateCommentReader = require('./comment-reader');
const hinter = require('jshint');
var jsdoc = require('jsdoc-api');
let globals   = require('./globals');

/**
 * dirHandler private function
 * event function called when the walker{walk} hits a new directory
 *
 * @param {string} root the directory's full path
 * @param {object} dirStatsArray
 * @param {Function} next, the function to call to let the walker{walk} continue
 */
function dirHandler(root, dirStatsArray, next) {
	let theDir = {};
	theDir.root = root;
	//TODO(asy): use the es6 version of this current version.
	theDir.dirs = _.map(dirStatsArray, function (dir) {
		return {
			name: dir.name,
			mtime: dir.mtime
		};
	});
	d.push(theDir);
	next();
}

/**
 * errorHandler private function
 * event function called when the walker {walk} hits an error somehow
 * prints the error with the console on STDOUT
 *
 * @param {string} root the directory's full path
 * @param {object} dirStatsArray
 * @param {Function} next, the function to call to let the walker{walk} continue
 */
function errorsHandler(root, nodeStatsArray, next) {
  nodeStatsArray.forEach(function (n) {
    console.error("[ERROR] " + n.name);
    console.error(n.error.message || (n.error.code + ": " + n.error.path));
 });
  next();
}

/**
 * isFileInvalid private function
 * checks from the fileStat {object} if some attributes
 * fits some test, if the test is true the the file is invalid
 * returns the result of the test
 * 
 * @param {object} fileStat the file statistics object 
 * @return {boolean} the result of is the file is invalid
 */
function isFileInvalid (fileStat) {

 if(fileStat.name === ".DS_Store") {
     return true;
 }
 return false;
}


/**
 * fileHandler private function
 * event function called when walker {walk} hits a file
 * skips files when they are invalid
 * calls leasotFn otherwise
 *
* @param {string} root the directory's full path
 * @param {object} dirStatsArray
 * @param {Function} next, the function to call to let the walker{walk} continue
 */
function fileHandler(root, fileStat, next) {
  if (isFileInvalid(fileStat)) {
     next();
     return;
  }
  var filePath = path.resolve(root, fileStat.name);
  leasotFn(filePath, jsdoc, hinter.JSHINT);
  next();
}

/**
 * endHandler private function
 * event function called when the walker {walk} finishes scanning everything from given
 *
 * records the endDate
 * records the walkTime
 * writes into the Marklogic database db{MarklogicClient}
 *
 * starts a watcher on the directories scanned
 * the watcher will write into the Marklogic Database a new event document into the events
 * collection.
 *
 * @TODO(asy): reduce the amount of things this function does
 * @TODO(asy): create a Monadic Pipeline (ajax) to sequence the different things
 */
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
  

  db.writeCollection("/projects/files", resultsOfParsing.files).result()
    .then(function (uris){
      console.log("inserted "+ uris.length + " documents");
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
    /**
     *init: the Exported initialisation function
     *@param {object} databaseClient MarklogicClient object already connected
     * ready to perform operations
     * creates the variables that will have the context of
     * this function and will be usable in all functions called within this context
     * (they will be closures of this functon)
     *
     * @TODO(asy): handle the variables in a better way (Dependency Injection)
     */
    init: function (databaseClient) {
    
       db = databaseClient;
       resultsOfParsing = globals.resultsOfParsing;
       d = resultsOfParsing.directories;
       let walker  = walk.walk("./test-project", { followLinks: true});
       walker.on("directories", dirHandler);
       walker.on("file", fileHandler);
       walker.on("errors", errorsHandler); // plural
       walker.on("end", endHandler);
    }

};

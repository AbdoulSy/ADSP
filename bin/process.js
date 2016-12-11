/* jshint esversion: 6 */

let globals   = require('./includes/globals.js');
const handlers = require('./includes/walk-handlers');
const getEventsFn = require('./includes/get-events');
const getProcessDocumentsFn = require('./includes/get-processes');
var previousProcess = globals.previousProcess;
var resultsOfParsing = globals.resultsOfParsing;
var els;

module.exports = function(Connection, docsCb) {
  //Gets the events from Marklogic's database
  //see includes>get-events
  getEventsFn(Connection, els);

  //Trying to implement an idempotent method to preserve resources
  //we store when the walk Has started to monitor the speed of the crawling
  resultsOfParsing.walkStart = Date.now();
  //We reset the directories and files variables from global
  resultsOfParsing.directories = [];
  resultsOfParsing.files = [];

  handlers.init(Connection);

  //Gets the processed Documents from Marklogic's documents database
  getProcessDocumentsFn(Connection, previousProcess, docsCb);


};



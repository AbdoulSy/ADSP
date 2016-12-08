/* jshint esversion: 6 */

let globals   = require('./includes/globals.js');
const handlers = require('./includes/walk-handlers');
const getEventsFn = require('./includes/get-events');
const getProcessDocumentsFn = require('./includes/get-processes');
const my      = require(__dirname + '/../env/env');
const MarklogicClient = require('marklogic');
//Connecting to Marklogic
var db = MarklogicClient.createDatabaseClient(my.connection);
var qb = MarklogicClient.queryBuilder;
let connection = {db, qb};
console.log('\n CONNEXION TO MARKLOGIC ESTABLISHED');
var previousProcess = globals.previousProcess;
var resultsOfParsing = globals.resultsOfParsing;
var els;

module.exports = function(docsCb) {
  //Gets the events from Marklogic's database
  //see includes>get-events
  getEventsFn(connection, els);

  //Trying to implement an idempotent method to preserve resources
  //we store when the walk Has started to monitor the speed of the crawling
  resultsOfParsing.walkStart = Date.now();
  //We reset the directories and files variables from global
  resultsOfParsing.directories = [];
  resultsOfParsing.files = [];

  handlers.init(db);

  //Gets the processed Documents from Marklogic's documents database
  getProcessDocumentsFn(connection, previousProcess, docsCb);


};



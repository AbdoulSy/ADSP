/* jshint esversion: 6 */
var _ = require('lodash');
const my      = require(__dirname + '/../env/env');
const MarklogicClient = require('marklogic');
//Connecting to Marklogic
var db = MarklogicClient.createDatabaseClient(my.connection);
var qb = MarklogicClient.queryBuilder;
console.log('\n users marklogic connection established');

module.exports = function(callback) {
    db.documents.read('/stats/function-number.json')
    .result(function(documents) {
      callback(documents[0].content);
    });
  };

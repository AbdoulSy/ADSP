/* jshint esversion:6 */

/**
 * @namespace  adspbin
 * @file gets the last Events from The marklogic Server
 * @author Abdoul Sy <dreescan@gmail.com>
 */

const _ = require('lodash');

/**
 * ProcessReturnedDocuments processes the results of the SPARQL
 * query
 * @param documents {object}
 * @param els {object}
 */
function processReturnedDocuments(els) {
  let a = [];
  return function(documents) {
    if (documents.length > 0) {
      documents.forEach(function(document) {
        _.extend(a, document.contents);
      });
      els = a;
    }
  };
}

/**
 * GetEventsQuery should use the marklogic query builder to build a simple
 * Marklogic SPARQL query
 * @returns {object} the sparql query
 */
function getEventsQuery(queryBuilder) {
  return queryBuilder.where(queryBuilder.collection('events'));
}


/**
 * GetEventsFromDb gets the file events created by the file watcher
 * and updates the provided variable
 * @author adsp:Asy
 * @TODO <need to create tests to validate this behaviour>
 * @project adsp:ADSP
 */
module.exports = function getEventsFromDb(Connection, els) {
  //Getting events from the events collection
  Connection.docsDb.documents.query(getEventsQuery(Connection.qb))
   .result()
   .then(processReturnedDocuments(els),
     function(error) {
      console.log(JSON.stringify(error));
    });
};

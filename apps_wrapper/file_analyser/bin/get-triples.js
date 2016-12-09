/* jshint esversion: 6 */
var _ = require('lodash');

module.exports = function getTriplesRelatedToAdsp (Connection, callback) {
  let db = Connection.tripleDb;
  db.graphs.sparql({
    contentType: 'application/sparql-results+json',
    query: 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
           'PREFIX adsp: <http://web.abdoulsy.eu/o#>' +
           'SELECT ?owner ?team ?project_type ?conventions WHERE {' +
           'adsp:ADSP adsp:has_owner ?owner .'+
           'adsp:ADSP adsp:has_team ?team .'+
           'adsp:ADSP adsp:has_project_type ?project_type .'+
           'adsp:ADSP adsp:has_project_convention ?conventions .'+
           '}',
  }).result(
      function(response) {
        console.dir(response.results.bindings);
        callback(response.results.bindings);
      },
      function(error) { console.log(JSON.stringify(error)); }
  );
};

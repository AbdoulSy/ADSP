/* jshint esversion: 6 */
var _ = require('lodash');

module.exports = function getTeamByUserUri (Connection, userURI, callback) {
  let db = Connection.tripleDb;
  db.graphs.sparql({
    contentType: 'application/sparql-results+json',
    query: 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
           'PREFIX adsp: <http://web.abdoulsy.eu/o#>' +
           'SELECT ?team ?member WHERE {' +
            userURI + ' adsp:has_team ?team .'+
            '?team adsp:has_member ?member .' +
           '}',
  }).result(
      function(response) {
        console.dir(response.results.bindings);
        callback(response.results.bindings);
      },
      function(error) { console.log(JSON.stringify(error)); }
  );
};

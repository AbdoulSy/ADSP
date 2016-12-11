/* jshint esversion: 6 */
var _ = require('lodash');

module.exports = function getProjectsByUser (Connection, userURI, callback) {
  let db = Connection.tripleDb;
  db.graphs.sparql({
    contentType: 'application/sparql-results+json',
    query: 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>' +
           'PREFIX adsp: <http://web.abdoulsy.eu/o#>' +
           'SELECT ?project ?project_name  WHERE {' +
            userURI + ' adsp:works_in_project ?project .' +
           '?project adsp:project_name_value ?project_name .' +
           '}',
  }).result(
      function(response) {
        console.dir(response.results.bindings);
        callback(response.results.bindings);
      },
      function(error) { console.log(JSON.stringify(error)); }
  );
};

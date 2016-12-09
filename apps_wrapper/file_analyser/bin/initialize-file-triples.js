/* jshint esversion: 6 */
var _ = require('lodash');

module.exports = function getTriplesRelatedToAdsp (Connection, callback) {
  let db = Connection.tripleDb;
  let triples = [
    '@prefix adsp: <http://web.abdoulsy.eu/o#> .',
    '@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .',
    '@prefix owl: <http://www.w3.org/2002/07/owl#>',
    'adsp:has_application  a owl:ObjectProperty .',
    'adsp:has_application  rdfs:domain adsp:Project .',
    'adsp:has_application  rdfs:range adsp:Application .',
    'adsp:file_analyser_app a adsp:Application .',
    'adsp:Eyedol a adsp:Application .',
    'adsp:Glacius a adsp:Application .',
    'adsp:ADSP_Dashboard a adsp:Application',
    'adsp:has_file a owl:ObjectProperty .',
    'adsp:has_file rdfs:domain adsp:Application .',
    'adsp:has_file rdfs:range adsp:File .',
    'adsp:ADSP adsp:has_application adsp:file_analyser_app .',
    'adsp:ADSP adsp:has_application adsp:Glacius .',
    'adsp:ADSP adsp:has_application adsp:ADSP_Dashboard .',
  ];
  db.graphs.merge({
      uri: 'http://aria.abdoulsy.eu/collections/adsp',
      contentType: 'text/turtle',
      data: triples.join('\n'),
      repair: true
  }).result(
      function(response) {
        console.log(JSON.stringify(response));
      },
      function(error) { console.log(JSON.stringify(error)); }
  );

};



/* jshint esversion: 6 */
var _ = require('lodash');
const my      = require(__dirname + '/../env/env');
const MarklogicClient = require('marklogic');
//connecting to Marklogic
var db = MarklogicClient.createDatabaseClient(my.triple);
var qb = MarklogicClient.queryBuilder;

console.log("\n users marklogic connection established");

db.graphs.list('text/uri-list')
  .result(
    function(response) {
      for (var uri of response.split('\n')) {
        console.log(uri);
      }
    },
    function(error) { console.log(JSON.stringify(error)); }
);


db.graphs.sparql({
  contentType: 'application/sparql-results+json',
  query: 'PREFIX adsp: <http://aria.abdoulsy.eu/ontology/ADSP/Web_Project#>'+
  'SELECT ?s ?email ?value WHERE '+
  '{'+
  '?s adsp:firstname "Abdoul".'+
  '?s a adsp:Member .'+
  '?s adsp:has_active_email ?email .'+
  '?email adsp:email_value ?value .'+
  '}',
  rulesets: 'subPropertyOf.rules',
  defaultRuleSets: 'exclude'
}).result(
    function(response) {
      console.dir(response.results.bindings);
    },
    function(error) { console.log(JSON.stringify(error)); }
);;

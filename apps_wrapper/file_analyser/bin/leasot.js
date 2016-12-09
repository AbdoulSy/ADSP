/* jshint esversion:6 */
const _ = require('lodash');
var globals = require('./includes/globals.js');
var fs = require('fs');
var path = require('path');
var leasot = require('leasot');

var resultsOfParsing = globals.resultsOfParsing;
var previousProcess = globals.previousProcess;

/**
 * DoLeasot, exported function, analyses a file for Todo/Fixme comments
 * then analyses the file for jsDoc type comment
 * will perforn a jshint on the file and a test/code coverage on the file
 * returns a report to be sent to Marklogic
 *
 *@TODO(asy): import jshint along with the current conventions and analyse the file
 *@TODO(asy): import a code coverage report for the current file somehow
 *@TODO(asy): trim the path prior to the project root name to keep an unique path.
 *
 *@param {string} filePath the fullPath of the filename to analyse
 *@param {JsDoc} FileExplainer a variable holding the jsdoc required
 *@param {object} db MarklogicClient database connection pointing to the Documents database
 *@param {object} tripleStore MarklogicClient database connection pointing to adsp-db triple store
 *@return {object} the report as a plain object
 */
module.exports = function doLeasot(filePath, FileExplainer, JSHINT, db, tripleStore) {

  //ToReturn is the object to be returned by the process
  //@TODO(asy): create a pipeline using Monadic functions.
  let toReturn = {};
  //TODO(asy): extract the triple writing functionnalities out of the files
  let triples = [
    '@prefix adsp: <http://web.abdoulsy.eu/o#> .',
    '@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .',
    '@prefix owl: <http://www.w3.org/2002/07/owl#>',
    'adsp:Documentation a owl:Class .',
    'adsp:TODO a owl:Class .',
    'adsp:has_documentation a owl:ObjectProperty .',
    'adsp:has_documentation rdfs:domain adsp:File .',
    'adsp:has_documentation rdfs:range adsp:Documentation .',
    'adsp:doc_contents a owl:DataProperty .',
    'adsp:doc_contents rdfs:domain adsp:Documentation .',
    'adsp:todo_contents a owl:DataProperty .',
    'adsp:todo_contents rdfs:domain adsp:TODO .',
    'adsp:has_todo a owl:ObjectProperty .',
    'adsp:has_todo rdfs:domain adsp:File .',
    'adsp:has_todo rdfs:range adsp:TODO .'
  ];

  //Default values to demonstrate the test
  toReturn.project_path = _.replace(filePath, '/Users/asmart/Codenames/Github/ADSP/bin/', '');

  //Contents holds the contents of the file as a string
  //at the moment I read the contents of the file asynchronously
  //if the walkTime exceeds 1000ms, check for the performances again.
  var contents = fs.readFileSync(filePath, 'utf8');
  toReturn.contents = contents;
  // Get the filetype of the file, or force a special parser
  var filetype = path.extname(filePath);
  // Add file for better reporting
  var file = path.basename(filePath);

  var filename = _.replace(file, '.', '_');
  var subjectUri = "adsp:" + filename + 'File ';
  var docUri = "adsp:" + filename + 'Documentation ';


  //Simple logo

  if (filetype === '.json') {
    return {};
  }

  if (filetype === '.js') {
    triples.push(subjectUri + 'a adsp:Javascript_file .');
    triples.push('adsp:file_analyser_app adsp:has_file '+ subjectUri +' .');

    //ToReturn.doc is the variable holding the parsing of
    //the contents for the jsdocs.
    toReturn.doc = FileExplainer.explainSync({source: contents});
    triples.push(docUri + 'a adsp:Documentation .');
    triples.push(subjectUri + 'adsp:has_documentation ' + docUri + ' .');
    //TODO find a way to import json data into triples
    //TODO(asy): find a way to import the HTML docs into Marklogic
    //triples.push(docUri + 'adsp:doc_contents ' + toReturn.doc + ' .');
    //TODO explode the hints into data can can be processed for triples
    JSHINT(contents/* , options, predef */);
    toReturn.hints = JSHINT.data();
  }

  var unsupportedTypes = ['.sparql'];
  if (filetype !== '' && unsupportedTypes.indexOf(filetype) === -1) {
    //The todos returned by the leasot parse reporter
    toReturn.todos = leasot.parse({ext: filetype, content: contents, fileName: file});
    //TODO(asy): return todo.line, todo.filame, todo.ref as triples
    _.each(toReturn.todos, function (todo, index) {
      let todoUri = 'adsp:' + filename + '_' + index + 'TODO ';
      triples.push(todoUri + 'a adsp:TODO .');
      triples.push(subjectUri + 'adsp:has_todo '+ todoUri +' .');
      triples.push(todoUri + 'adsp:todo_contents "'+ todo.text +'" .');
      triples.push(subjectUri + 'adsp:has_todo ' + todoUri);
    });
  }


  tripleStore.graphs.merge({
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

  //@TODO(asy): remove the console log for #production.
  //console.log(toReturn);

  // -> todos now contains the array of todos/fixme parsed

  resultsOfParsing.files.push(toReturn);

  return toReturn;
};

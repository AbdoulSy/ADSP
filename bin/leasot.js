/* jshint esversion:6 */
const _ = require('lodash');
var globals = require('./includes/globals.js');
var fs = require('fs');
var path = require('path');
var leasot = require('leasot');

var resultsOfParsing = globals.resultsOfParsing;
var previousProcess = globals.previousProcess;

/**
 * doLeasot, exported function, analyses a file for Todo/Fixme comments
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
 *@return {object} the report as a plain object
 */
module.exports = function doLeasot (filePath, FileExplainer, JSHINT) {

  //toReturn is the object to be returned by the process
  //@TODO(asy): create a pipeline using Monadic functions.
  let toReturn = {};

  //default values to demonstrate the test
  //TODO create the variable from a db request to get the current project
  //being evaluated

  toReturn.project_path = _.replace(filePath, "/Users/asmart/Codenames/Github/ADSP/test-project/", "");

  toReturn.adsp_type = "http://web.abdoulsy.eu/o#ProjectFile";
  toReturn.adsp_shortType = "ProjectFile";
  toReturn.adsp_operations = ["extract_todos", "jshint", "jsdoc"];
  toReturn.adsp_in_project = "test-project";
  toReturn.adsp_parent_project = "ADSP";

  //contents holds the contents of the file as a string
  //at the moment I read the contents of the file asynchronously
  //if the walkTime exceeds 1000ms, check for the performances again.
  var contents = fs.readFileSync(filePath, 'utf8');
  toReturn.contents = contents;
  // get the filetype of the file, or force a special parser
  var filetype = path.extname(filePath);
  // add file for better reporting
  var file = path.basename(filePath);

  //Simple logo

  if(filetype === ".json" || file === "web") {
  	return {};
  }

  if(filetype === ".js") {
    //toReturn.doc is the variable holding the parsing of
    //the contents for the jsdocs.
    toReturn.doc = FileExplainer.explainSync({source: contents});
    JSHINT(contents/* , options, predef */);
    toReturn.hints = JSHINT.data();
  }

  var unsupportedTypes = [".sparql"];
  if(filetype !== "" && unsupportedTypes.indexOf(filetype) === -1) {
    //the todos returned by the leasot parse reporter
    toReturn.todos = leasot.parse({ext: filetype, content: contents, fileName: file});
  }

  //@TODO(asy): remove the console log for #production.
  console.log(toReturn);

   // -> todos now contains the array of todos/fixme parsed

  resultsOfParsing.files.push(toReturn);

  return toReturn;
};

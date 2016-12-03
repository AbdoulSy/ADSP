/* jshint esversion: 6 */
var _ = require('lodash');
const my      = require('../apps_wrapper/env/env');
const MarklogicClient = require('marklogic');
//connecting to Marklogic
var db = MarklogicClient.createDatabaseClient(my.connection);
var qb = MarklogicClient.queryBuilder;
console.log("\n projects/list marklogic connection established");
let projects = [];

module.exports = function (callback) {
    db.documents.read('/projects/list.json')
    .result(function(documents) {

        //TODO(asy): handle the case where more than
        //one document is a project list
        _.each(documents, function (document) {
            projects.push(document.content);
        });

       callback(_.flatten(projects));
    });
};
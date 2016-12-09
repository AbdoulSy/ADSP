/* jshint esversion: 6 */
var _ = require('lodash');
let projects = [];
module.exports = function(Connection, callback) {
    let db = Connection.docsDb;
    db.documents.read('/projects/list.json')
    .result(function(documents) {
        //TODO(asy): handle the case where more than one document is a project list
        _.each(documents,  (document) => {projects.push(document.content);});
        callback(_.flatten(projects));
      });
  };

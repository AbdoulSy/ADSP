/* jshint esversion: 6 */
var _ = require('lodash');
module.exports = function(Connection, callback) {
    let db = Connection.docsDb;
    db.documents.read('/user.json')
    .result(function(documents) {
      callback(documents[0].content);
    });
  };

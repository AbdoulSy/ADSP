/* jshint esversion: 6 */

module.exports = function getProcesses(connection, documents) {
  const db = connection.db;

   db.documents.read('/ps/process.json')
     .result( function(documents) {
       previousProcess = documents;
       documents.forEach(function(document) {
         console.log(JSON.stringify(document));
       });
       }, function(error) {
         console.log(JSON.stringify(error, null, 2));
    });
};

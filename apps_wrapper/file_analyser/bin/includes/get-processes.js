/* jshint esversion: 6 */

/**
 * @namespace adspbin
 * @file gets the result of the file walking and leasot analysis
 * @author Abdoul Sy <dreescan@gmail.com>
 */

//Of course TODO: make the code a bit more ES6-sexy
/**
 * Handles Reading the process data sucessfully
 * @param  {object}   previousProcess The previous process results
 * @param  {Function} callback        The function executed with the returned elements
 * @return {Function}                   The curried function that will actually handle the success event
 */
function handleReadSuccessResult(previousProcess, callback) {
  console.log('handleReadSuccessResult called');
  return function successFn(documents) {
      console.log('successFn curried function called')	;
      previousProcess = documents;
      documents.forEach(function(document) {
        //  Console.log(JSON.stringify(document));
      });
      if (callback && typeof callback === 'function') {
        callback(documents);
      }

    };

}

//Simple function to handle the errors, todo fit the ontology's model
/**
 * Handles a Read Error Result
 * @param  {Object} error The Error and its metadata
 */
function handleReadErrorResult(error) {
  console.log(JSON.stringify(error, null, 2));
}

/**
 * Gets the last process run from marklogic
 * @param  {object}   connection      The connection
 * @param  {object}   previousProcess The previous process
 * @param  {Function} callback        the callback function
 */
module.exports = function getProcesses(connection, previousProcess, callback) {
  const db = connection.db;

  //The Read operation on the /ps/process.json file created when scraping the js files
  db.documents.read('/ps/process.json')
    .result().then(handleReadSuccessResult(previousProcess, callback),
      handleReadErrorResult);
};

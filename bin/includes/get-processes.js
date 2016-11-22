/* jshint esversion: 6 */

//of course TODO: make the code a bit more ES6-sexy
function handleReadSuccessResult (previousProcess, callback) {
  console.log("handleReadSuccessResult called");	
  return function successFn(documents) {
       console.log("successFn curried function called")	;  
       previousProcess = documents;
       documents.forEach(function(document) {
       //  console.log(JSON.stringify(document));
       });
       if(callback && typeof callback === 'function') {
       	 callback(documents);
       }

  };

}

//simple function to handle the errors, todo fit the ontology's model
function handleReadErrorResult (error) {
         console.log(JSON.stringify(error, null, 2));
}


module.exports = function getProcesses(connection, previousProcess, callback) {
  const db = connection.db;

  //The Read operation on the /ps/process.json file created when scraping the js files
   db.documents.read('/ps/process.json')
     .result().then(handleReadSuccessResult(previousProcess, callback), 
       handleReadErrorResult); 
};

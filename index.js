/* jshint esversion: 6 */
var express = require('express');
var app = express();
var process = require('./bin/process');
var leasotFn = require('./bin/leasot');

app.get('/', function (req, res) {
        process(function callback(docs) {
	  let docsContents = docs[0].content;	
	  let stringDocs = JSON.stringify(docsContents);	
	  res.send(stringDocs);
	});

	var result = leasotFn('./test-project/main.js');
	console.log(result);
      	//res.send('Hello World!');
});

app.listen(3465, function () {
  console.log('Example app listening on port 3465!');
});

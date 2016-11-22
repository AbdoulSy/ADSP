/* jshint esversion: 6 */
var express = require('express');
var app = express();
var process = require('./bin/process');

app.get('/', function (req, res) {
        process(function callback(docs) {
	  let docsContents = docs[0].content;	
	  console.log(docsContents);
	  console.log('>>>>>');
	  console.log(docsContents.files);
	  let stringDocs = JSON.stringify(docsContents);	
	  res.send(stringDocs);
	});
      	//res.send('Hello World!');
});

app.listen(3465, function () {
  console.log('Example app listening on port 3465!');
});

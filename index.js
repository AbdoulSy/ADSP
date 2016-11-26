/* jshint esversion: 6 */
var express = require('express');
var app = express();
var process = require('./bin/process');

app.get('/', function (req, res) {
        process(function callback(docs) {
	  let docsContents = docs[0].content;	
	  let stringDocs = JSON.stringify(docsContents);	
	  res.send(stringDocs);
	});

});

app.listen(3465, function () {
  console.log('ADSP metadata extractor listening on port 3465!');
});

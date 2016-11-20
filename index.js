var express = require('express');
var app = express();
var process = require('./bin/process');

app.get('/', function (req, res) {
        process(function callback(docs) {
	  res.send(JSON.stringify(docs));
	});
      	//res.send('Hello World!');
});

app.listen(3465, function () {
  console.log('Example app listening on port 3465!');
});

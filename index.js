/* jshint esversion: 6 */
var express = require('express');
var app = express();
var processFn = require('./bin/process');
var getProjectsFn = require('./bin/get-projects');
var getUserFn = require('./bin/get-users');
var getCommitHistoryFn = require('./bin/git-log');

app.get('/', function (req, res) {
    try {
      processFn(function callback(docs) {
          let docsContents = docs[0].content;
	  let stringDocs = JSON.stringify(docsContents);
	  res.send(stringDocs);
      });
    } catch (e) {
        console.log({
	   exception: e
	});
    }
});

app.get('/projects', function (req, res) {
    try {
        getProjectsFn(function (projects) {
		res.send(projects);
	});
    } catch (e) {
        console.log({
	       exception: e
	      });
    }

});

app.get('/current-user', function (req, res){
    getUserFn(function(user){
       res.send(user);
    });

});

app.get('/commit-history', function (req, res) {
   getCommitHistoryFn(function(commits) {
      res.send(commits);
   });
});


app.listen(3465, function () {
  console.log('ADSP metadata extractor listening on port 3465!');
});

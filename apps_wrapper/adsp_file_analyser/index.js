/* jshint esversion: 6 */
var express = require('express');
var app = express();
var processFn = require('./bin/process');
var getProjectsFn = require('./bin/get-projects');
var getTriplesRelatedToADSPFn = require('./bin/get-triples');
var initTriplesForLeasot = require('./bin/initialize-file-triples');
var getUserFn = require('./bin/get-users');
var getCommitHistoryFn = require('./bin/git-log');
var getFnNbFn = require('./bin/get-fn-nb');
const my      = require(__dirname + '/env/env');
const MarklogicClient = require('marklogic');
//Connecting to Marklogic
var Conn = {};
Conn.docsDb = MarklogicClient.createDatabaseClient(my.connection);
Conn.tripleDb = MarklogicClient.createDatabaseClient(my.triple);
Conn.qb = MarklogicClient.queryBuilder;

app.get('/', function (req, res) {
    try {
      processFn(Conn, function callback(docs) {
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

app.get('/init', function (req, res) {
    try {
      initTriplesForLeasot(Conn);
    } catch (e) {
        console.log({
          exception: e
        });
    }
});

app.get('/adsp', function (req, res) {
    try {
      getTriplesRelatedToADSPFn(Conn, function cb(results){
        res.send(results);
      });
    } catch (e) {
        console.log({
          exception: e
        });
    }
});

app.get('/projects', function (req, res) {
    try {
      getProjectsFn(Conn, function (projects) {
        res.send(projects);
      });
    } catch (e) {
        console.log({
         exception: e
        });
    }
});

app.get('/function-number', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    try {
        getFnNbFn(Conn, function (data) {
        res.send(data);
  });
    } catch (e) {
        console.log({
         exception: e
        });
    }

});

app.get('/current-user', function (req, res){
    getUserFn(Conn, function(user){
       res.send(user);
    });
});

app.get('/commit-history', function (req, res) {
  res.send([]);
  return;
   getCommitHistoryFn(Conn, function(commits) {
      res.send(commits);
   });
});

app.listen(3465, function () {
  console.log('ADSP metadata extractor listening on port 3465!');
});

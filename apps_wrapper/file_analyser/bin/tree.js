/* jshint esversion: 6 */
var dirToJson = require('dir-to-json');
var _ = require('lodash');
const my      = require('../apps_wrapper/env/env');
const MarklogicClient = require('marklogic');
//Connecting to Marklogic
var db = MarklogicClient.createDatabaseClient(my.connection);
var qb = MarklogicClient.queryBuilder;
let connection = {db, qb};
console.log('\n CONNEXION TO MARKLOGIC ESTABLISHED');
let projects = [];

dirToJson('../test-project', function(err, dirTree) {
    if (err) {
      console.log('error', err);
      throw err;
    }else {

      if (dirTree.name === 'projects' && dirTree.children) {
        console.log('found children to the project directory >>' + dirTree.name);
        _.each(dirTree.children, function(child) {
          if (child.type === 'directory') {
            child.adsp_type = 'http://web.abdoulsy.eu/o#Project';
            child.adsp_name = child.name;
            child.adsp_uri = 'http://web.abdoulsy.eu/o#' + child.name + 'Project';
            child.uri = '/projects/' + child.name + '.json';
            child.adsp_used_in = [];
            child.adsp_standardCompletionPercentage = 2;
            child.adsp_authorUsername = 'asy';
            //Including the project in the collection
            projects.push(child);
            console.dir(child);
          }
        });
      } else {
        if (dirTree.children && dirTree.path === '') {
          let p = dirTree;
          p.name = 'test-project';
          p.type = 'directory';
          p.adsp_type = 'http://web.abdoulsy.eu/o#Project';
          p.adsp_name = 'test-project';
          p.adsp_uri = 'http://web.abdoulsy.eu/o#' + p.name + 'Project';
          p.uri = '/projects/test-project.json';
          p.adsp_used_in = ['http://web.abdoulsy.eu/o#ADSPProject'];
          p.adsp_stardardCompletionPercentage = 3;
          p.adsp_authorUsername = 'asy';

          projects.push(p);
          console.dir(p);
        }

      }



    }
    let a = db.writeCollection('projects', projects).result();
    console.log(a);
    a.then(function(uris) {
      console.log(`saved ${uris.length} elements`);
      _.each(uris, function(uri) {
        console.log(uri);
      });
    });
    return projects;
  });

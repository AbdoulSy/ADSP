/* jshint esversion:6 */

const CDocParser = require('cdocparser');
const _       = require('lodash');
var globals = require('./globals.js');
var resultsOfParsing = globals.resultsOfParsing;
var previousProcess = globals.previousProcess;

module.exports = function initiateCommentReader(opts, code) {

    var extractor = new CDocParser.CommentExtractor(function (line, arg2) {
      return {
        type: opts.type, 
        file: opts.file,
        line: arg2(0)

     };
    }, opts.extractorOptions );

    var parser = new CDocParser.CommentParser({
        _: {
  	  alias: {
	   todo: 'TODO'
         }
       },
       TODO: {
         parse: function(annotationLine, info, id) {
 	   return _.trimStart(annotationLine, ':');      
         },
         default: function() {
           return "Not Implemented";
         }      
       },
       milestone: {
         parse: function(line) {
	   return _.trimStart(line, ':');
	 },
	 default: function () {
	   return '--';
	 }
       },
       collabs: {
	  parse: function (line) {
	    return _.trimStart(line, ':').split(',');
	  },
	 default: function () {
	   return '--';
	 }
	},
	project: {
         parse: function (line) {
	    return _.trimStart(line, ':').split('/');
	  },	
	 default: function () {
	   return '--';
	 }
	},
	author: {
	 parse: function (annotationLine) {
	    return _.trimStart(annotationLine, ':');
	  },
	 default: function () {
	   return '--';
	 }
	}
    });

    var comments = extractor.extract(code);
    var parsedComments = parser.parse(comments);
    var ext = {};
    ext.author = '';
    ext.project = '';
    ext.milestone = '';
    ext.collabs = '';
    ext.file = opts.file;


    parsedComments.forEach(function(comment) {
	if(comment.milestone !== '--') {
	  ext.milestone = comment.milestone;
	}    
	if(comment.author !== '--') {
	  ext.author= comment.author;
	}    
	if(comment.project !== '--') {
	  ext.project= comment.project;
	}    
	if(comment.collabs !== '--') {
	  ext.collabs= comment.collabs;
	}   
	var a = _.extend(comment, ext);
        resultsOfParsing.files.push(a);
    });

};

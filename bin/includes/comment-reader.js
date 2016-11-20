/* jshint esversion:6 */

const _       = require('lodash');
var globals = require('./globals.js');
var getCommentExtractorFn = require('./comment-extractor.js');
var getCommentParserFn = require('./comment-parser.js');
var resultsOfParsing = globals.resultsOfParsing;
var previousProcess = globals.previousProcess;

module.exports = function initiateCommentReader(opts, code) {

    var extractor = getCommentExtractorFn(opts);
    var parser = getCommentParserFn(opts);

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

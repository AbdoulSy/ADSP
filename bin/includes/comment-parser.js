/* jshint esversion: 6 */

const CDocParser = require('cdocparser');
const _       = require('lodash');

module.exports = function getCommentParser (opts) {
    return  new CDocParser.CommentParser({
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
};

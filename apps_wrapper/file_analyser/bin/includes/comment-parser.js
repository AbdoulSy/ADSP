/* jshint esversion: 6 */

/**
 * @package  adspbin
 * @file This file extract comments (deprecates)
 */

const CDocParser = require('cdocparser');
const _       = require('lodash');
/**
 * Gets a Comment Parser
 * @param  {object} opts map[string:interface{}]
 * @return {object}      the CdDocParser instance
 */
module.exports = function getCommentParser(opts) {
    return new CDocParser.CommentParser({
        _: {
          alias: {
            todo: 'TODO',
          },
        },
        TODO: {
          parse: function(annotationLine, info, id) {
            return _.trimStart(annotationLine, ':');
          },
          default: function() {
            return ['Not Implemented'];
          },
        },
        milestone: {
          parse: function(line) {
            return _.trimStart(line, ':');
          },
          default: function() {
            return '--';
          },
        },
        collabs: {
          parse: function(line) {
            return _.trimStart(line, ':').split(',');
          },
          default: function() {
            return '--';
          },
        },
        project: {
                parse: function(line) {
                  return _.trimStart(line, ':').split('/');
                },
                default: function() {
                  return '--';
                },
              },
        author: {
          parse: function(annotationLine) {
            return _.trimStart(annotationLine, ':');
          },
          default: function() {
            return '--';
          },
        },
      });
  };

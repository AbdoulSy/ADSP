/* jshint esversion: 6 */
/**
 * @namespace  adspbin
 * @file extracts a comment using cDocParser
 * @author Abdoul Sy <dreescan@gmail.com>
 */

/**
 * Library To Extract comments
 * @type {Object}
 */
const CDocParser = require('cdocparser');
/**
 * Exports the function to extract comments
 * @param  {object} opts map[string:string] simple options
 * @return {object}      {type, file, line}
 */
module.exports = function getCommentsExtractor(opts) {
  return new CDocParser.CommentExtractor(function(line, arg2) {
      return {
        type: opts.type,
        file: opts.file,
        line: arg2(0),

      };
    }, opts.extractorOptions);
};

/* jshint esversion: 6 */

const CDocParser = require('cdocparser');
module.exports = function getCommentsExtractor (opts) {
return new CDocParser.CommentExtractor(function (line, arg2) {
    return {
      type: opts.type, 
      file: opts.file,
      line: arg2(0)

   };
  }, opts.extractorOptions );
};

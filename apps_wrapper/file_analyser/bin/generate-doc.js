var jsdoc = require('jsdoc-api');
var process= require('process');

jsdoc.renderSync({ files: __dirname + '/../*', destination: __dirname + '/../out' });



var fs = require('fs');
var path = require('path');
var leasot = require('leasot');

module.exports = function (filePath) {

  var contents = fs.readFileSync(filePath, 'utf8');
  // get the filetype of the file, or force a special parser 
  var filetype = path.extname(filePath);
  // add file for better reporting 
  var file = path.basename(filePath);
  var todos = leasot.parse({ext: filetype, content: contents, fileName: file});
 
   // -> todos now contains the array of todos/fixme parsed 
 
  var output = leasot.reporter(todos, {
      reporter: 'json',
      spacing: 2
  });
 
  console.log(output);
  return output;
}; 

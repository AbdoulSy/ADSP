var fixme = require('fixme');
// All values below are Fixme default values unless otherwise overridden here. 
fixme({
  path:                 process.cwd() + '/apps_wrapper/projects',
  ignored_directories:  ['node_modules/**', '.git/**', '.hg/**'],
  file_patterns:        ['**/*.js', 'Makefile', '**/*.sh'],
  file_encoding:        'utf8',
  line_length_limit:    1000
});

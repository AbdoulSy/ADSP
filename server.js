'use strict';

var  express = require('express');

// Constants
var PORT = 3465;

// App
var  app = express();
app.use('/', express.static(__dirname + '/.'));

app.listen(PORT);
console.log('Running on http://ibuki.abdoulsy.eu:' + PORT);

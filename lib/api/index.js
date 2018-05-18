var path = require('path');

var endpoints = [];

require('fs').readdirSync(__dirname).forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    endpoints.push(require('./' + file));
  }
});

module.exports = endpoints;

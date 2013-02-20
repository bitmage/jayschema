//
// Expose the various JaySchema classes to the user. Backward-
// compatible with JaySchema 0.1.x.
//

var toExport = require('./validator.js');

toExport.Validator = require('./validator.js');
toExport.Errors = require('./errors.js');
toExport.Loaders = {
  Http: require('./httpLoader.js')
};

module.exports = toExport;

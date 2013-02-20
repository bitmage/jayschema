// Unit tests. Run with mocha.
// Ensure we are exporting a version 0.1.x-compatible API.

/*global describe:true it:true */


var JaySchema = require('../lib/jaySchema.js')
  , assert = require('assert')
  , v4schema = require('../lib/suites/draft-04/json-schema-draft-v4.json')
  ;

describe('Version 0.1.x-compatible API:', function() {
  describe('validator object:', function() {
    it('should construct a validator', function() {
      var js = new JaySchema();
    });

    it('should be able to do a self-validation', function() {
      var js = new JaySchema();
      js.validate(v4schema, v4schema);
    });

    it('should be able to create a v0.1.x error object', function() {
      var err = new JaySchema.errors.ValidationError();
    });

    it('should be able to create a v0.1.x validator with the HTTP loader',
      function()
    {
      var err = new JaySchema(JaySchema.loaders.http);
    });
  });
});

// Unit tests. Run with mocha.

/*global describe:true it:true should:true */


var should = require('should')
  , JaySchema = require('../lib/jaySchema.js')
  , v4Schema = require('../lib/suites/draft-04/json-schema-draft-v4.json')
  ;

var schemaUrl = 'http://json-schema.org/draft-04/schema#';

describe('JSON schema self-validation test:', function() {
  describe('validate meta-schema (synchronously):', function() {
    var v = new JaySchema.Validator();
    it('should self-validate the JSON Schema schema', function() {
      v.validate(v4Schema, v4Schema).should.be.empty;
    });
  });

  describe('validate meta-schema (asynchronously):', function() {
    var v = new JaySchema.Validator(JaySchema.HttpLoader);
    it('should self-validate the JSON Schema schema', function(done) {
      v.validate(v4Schema, {$ref: schemaUrl}, function(errs) {
        should.not.exist(errs);
        done();
      });
    });
  });

});

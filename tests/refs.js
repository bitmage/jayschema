// Unit tests. Run with mocha.

/*global describe:true it:true should:true */


var should = require('should')
  , JaySchema = require('../lib/jayschema.js')
  ;

describe('JSON references:',
  function()
{
  describe('reference previously manually-registered schema:', function() {

    var v = new JaySchema.Validator();
    var sch;

    var otherSchema = {
      id: 'http://foo.bar/name#',
      type: 'object',
      required: ['first', 'last'],
      properties: {
        first: { $ref: '#/definitions/nameField' },
        last: { type: 'string' }
      },
      definitions: {
        nameField: { type: 'string' }
      }
    };

    v.register(otherSchema);

    it('should validate', function() {
      sch = {
        type: 'object',
        properties: {
          name: { $ref: 'http://foo.bar/name#' }
        }
      };

      v.validate({name: {first: 'Mohammed', last: 'Chang'}}, sch)
        .should.be.empty;
    });

    it('should fail validation', function() {
      sch = {
        type: 'object',
        properties: {
          name: { $ref: 'http://foo.bar/name#' }
        }
      };

      v.validate({name: {last: 'Chang'}}, sch).should.not.be.empty;
    });

  });

  describe('validate using the string id of a registered schema', function() {

    var v = new JaySchema.Validator();

    var schema = {
      id: 'http://foo.bar/name#',
      type: 'object',
      required: ['first', 'last'],
      properties: {
        first: { $ref: '#/definitions/nameField' },
        last: { type: 'string' }
      },
      definitions: {
        nameField: { type: 'string' }
      }
    };

    v.register(schema);

    it('should validate', function() {
      var data = {
        'first': 'John',
        'middle': 'Q.',
        'last': 'Public'
      };

      v.validate(data, 'http://foo.bar/name#').should.be.empty;
    });

    it('should fail validation', function() {
      var data = {
        'first': 'John'
      };

      v.validate(data, 'http://foo.bar/name#').should.not.be.empty;
    });

  });

});

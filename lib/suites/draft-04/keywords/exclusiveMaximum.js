// ******************************************************************
// § 5.1. Validation keywords for numeric instances
// ******************************************************************

var Errors = require('../../../errors.js');

module.exports = function(config) {
  var errors = [];
  if (config.schema.exclusiveMaximum) {
    if (config.inst >= config.schema.maximum) {
      errors.push(new Errors.NumericValidationError(config.resolutionScope,
        config.instanceContext, 'exclusiveMaximum', config.schema.maximum,
        config.inst));
    }
  }
  return errors;
};

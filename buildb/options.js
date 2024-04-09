"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateOptions = validateOptions;

function validateOptions(props, validation) {
  var obj = {};

  if (typeof validation !== 'undefined') {
    for (var key in props) {
      if (Object.prototype.hasOwnProperty.call(validation, key)) {
        if (typeof validation[key] == 'boolean') {
          obj[key] = props[key].toUpperCase() == 'TRUE';
        } else if (typeof validation[key] == 'number') {
          obj[key] = Number(props[key]);
        } else {
          obj[key] = props[key];
        }
      }
    }
  }

  return obj;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDecorators = validateDecorators;
exports.decoratorDefaults = exports.decoratorValidation = void 0;
var decoratorValidation = {
  name: '',
  scale: 0,
  fill: false,
  fillColor: '',
  fillOpacity: 0,
  frame: false,
  frameColor: '',
  iconColor: '',
  monoColor: ''
};
exports.decoratorValidation = decoratorValidation;
var decoratorDefaults = {
  name: '',
  scale: 0.18,
  fill: false,
  fillColor: '#FFFFFF',
  fillOpacity: 1,
  frame: true,
  frameColor: '#000000',
  iconColor: '#000000' // black

};
exports.decoratorDefaults = decoratorDefaults;

function validateDecorators(props) {
  var decArray;
  var decs = props['decorator'];

  if (decs) {
    decArray = [];

    if (Array.isArray(decs)) {
      decs.forEach(function (s) {
        try {
          var decorator = JSON.parse(s);

          if (Object.prototype.hasOwnProperty.call(decorator, 'name')) {
            decArray === null || decArray === void 0 ? void 0 : decArray.push(decorator);
          }
        } catch (e) {
          console.log('Invalid decorator: ' + s);
        }
      });
    } else {
      try {
        var decorator = JSON.parse(decs);

        if (Object.prototype.hasOwnProperty.call(decorator, 'name')) {
          decArray === null || decArray === void 0 ? void 0 : decArray.push(decorator);
        }
      } catch (e) {
        console.log('Invalid decorator: ' + decs);
      }
    }
  }

  return decArray;
}
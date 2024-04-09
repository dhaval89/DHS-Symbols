"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleDefaults = exports.styleValidation = exports.DecoratorLocation = void 0;

/**
 * Copyright (c) Dignitas Technologies, LLC
 *
 * This file and its contents are governed by one or more distribution and
 * copyright statements as described in the LICENSE.txt file distributed with
 * this work.
 */
var DecoratorLocation;
exports.DecoratorLocation = DecoratorLocation;

(function (DecoratorLocation) {
  DecoratorLocation[DecoratorLocation["BOTH"] = 0] = "BOTH";
  DecoratorLocation[DecoratorLocation["TOP"] = 1] = "TOP";
  DecoratorLocation[DecoratorLocation["BOTTOM"] = 2] = "BOTTOM";
})(DecoratorLocation || (exports.DecoratorLocation = DecoratorLocation = {}));
/**
 * Icon Style Validation constant
 */


var styleValidation = {
  decoratorLocation: '',
  decoratorMaxCount: 0,
  fill: false,
  fillColor: '',
  fillOpacity: 0,
  frame: false,
  frameName: '',
  frameColor: '',
  frameWidth: 0,
  icon: false,
  iconScale: 0,
  iconColor: '',
  iconStrokeWidth: 0,
  monoColor: '',
  name: '',
  nameBgColor: '',
  nameColor: '',
  nameFontSize: 0,
  outline: false,
  outlineColor: '',
  outlineWidth: 0,
  padding: 0,
  size: 0,
  standard: ''
};
/**
 * Icon Style Defaults constant
 */

exports.styleValidation = styleValidation;
var styleDefaults = {
  decoratorLocation: 'bottom',
  decoratorMaxCount: 0,
  fill: true,
  fillColor: '#FFFFFF',
  fillOpacity: 1,
  frame: true,
  frameName: '',
  frameColor: '#000000',
  frameWidth: 4,
  icon: true,
  iconScale: 1,
  iconStrokeWidth: 1,
  nameBgColor: '#FFFFFF',
  nameColor: '#000000',
  nameFontSize: 28,
  outline: false,
  outlineColor: '#FFFFFF',
  outlineWidth: 4,
  padding: 8,
  size: 256,
  standard: ''
};
exports.styleDefaults = styleDefaults;
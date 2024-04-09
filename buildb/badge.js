"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badgeDefaults = exports.badgeValidation = void 0;

/**
 * Copyright (c) Dignitas Technologies, LLC
 *
 * This file and its contents are governed by one or more distribution and
 * copyright statements as described in the LICENSE.txt file distributed with
 * this work.
 */

/**
 * Icon Badge Validation constant
 */
var badgeValidation = {
  badgeCount: 0,
  badgeRadius: 0,
  badgeFontSize: 0,
  badgeTextColor: '',
  badgeFillColor: '',
  badgeBaselineAdjust: 0
};
/**
 * Icon Badge Defaults constant
 */

exports.badgeValidation = badgeValidation;
var badgeDefaults = {
  badgeCount: 0,
  badgeRadius: 15,
  badgeFontSize: 24,
  badgeTextColor: '#000000',
  badgeFillColor: '#FFFFFF',
  badgeBaselineAdjust: 0.5
};
exports.badgeDefaults = badgeDefaults;
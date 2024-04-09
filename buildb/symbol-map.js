"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFrame = getFrame;
exports.findFrameDefinition = findFrameDefinition;
exports.findAssetName = findAssetName;
exports.isSymbolMapValid = exports.getSymbolMap = void 0;

var _svgAssets = require("./svg-assets.model");

/**
 * Copyright (c) Dignitas Technologies, LLC
 *
 * This file and its contents are governed by one or more distribution and
 * copyright statements as described in the LICENSE.txt file distributed with
 * this work.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
var symbolMap = require('../assets/symbol-map.json');

var getSymbolMap = JSON.stringify(symbolMap);
/**
 * Validate the symbol map json and ensure corresponding assets exist
 *
 * @returns true if symbol map is valid, else false
 */

exports.getSymbolMap = getSymbolMap;

function validateSymbolMap() {
  //TODO: validate symbolMap json
  // Validate Colors are legal
  if (symbolMap.colors) {
    symbolMap.colors.forEach(function (color) {
      if (!color.colorName) {
        return false;
      } //TODO: validate color.colorString

    });
  } // Validate Frames have corresponding svg assets


  if (symbolMap.frames) {
    symbolMap.frames.forEach(function (frame) {
      console.log('Validating Frame: ' + frame.frameName); //TODO: validate
    });
  }

  if (symbolMap.decorators) {
    symbolMap.decorators.forEach(function (decorator) {
      console.log('Validating Frame: ' + decorator.decName); //TODO: validate
    });
  } // Validate Icons have corresponding svg assets


  symbolMap.categories.forEach(function (category) {
    console.log('Validating Category: ' + category.catName); //TODO: validate
  });
  console.log('Symbol Map valid');
  return true;
}

var isSymbolMapValid = validateSymbolMap();
/**
 * Retrieve the frame for the given sidc
 *
 * @param sidc the symbol id code
 * @returns the mapped frame as a frame asset name or a frame definition, undefined if not mapped
 */

exports.isSymbolMapValid = isSymbolMapValid;

function getFrame(sidc) {
  var returnFrame;

  if (sidc && sidc.length > 0 && symbolMap.catIdLength) {
    var index = 0;
    var parentCat = void 0; // Get the category id

    var parentId_1 = sidc.substr(index, symbolMap.catIdLength);

    if (parentId_1 && parentId_1.length > 0) {
      // Find the category
      parentCat = symbolMap.categories.find(function (category) {
        if (category.catId && category.catId.toLocaleUpperCase() === parentId_1.toLocaleUpperCase()) {
          return category;
        }
      });
    }

    if (parentCat) {
      if (parentCat.frameName) {
        // Start with the parent frame if defined
        returnFrame = 'frame-' + parentCat.frameName;
      } // The root category of the id has been processed so increment the index


      index += symbolMap.catIdLength;

      var _loop_1 = function _loop_1() {
        // Need to re-check for parent cat undefined as we traverse
        if (parentCat) {
          if (parentCat.iconIdLength && parentCat.icons) {
            // This category has icons
            var iconDef = void 0; // Get the icon id

            var iconId_1 = sidc.substr(index, parentCat.iconIdLength);

            if (iconId_1 && iconId_1.length > 0) {
              // Find the icon
              iconDef = parentCat.icons.find(function (icon) {
                if (icon.iconId && icon.iconId.toLocaleUpperCase() === iconId_1.toLocaleUpperCase()) {
                  return icon;
                }
              });
            }

            if (iconDef) {
              // Found the icon we were looking for
              if (iconDef.frameName) {
                // Icon has a frame defined so use it
                returnFrame = 'frame-' + iconDef.frameName;
              }
            }

            return "break";
          } else if (parentCat.subcatIdLength && parentCat.subcategories) {
            // this category has subcategories
            var childCat = void 0; // Get the subcategory id

            var childId_1 = sidc.substr(index, parentCat.subcatIdLength);

            if (childId_1 && childId_1.length > 0) {
              // Find the category
              childCat = parentCat.subcategories.find(function (category) {
                if (category.catId && category.catId.toLocaleUpperCase() === childId_1.toLocaleUpperCase()) {
                  return category;
                }
              });
            }

            if (childCat) {
              if (childCat.frameName) {
                // Subcategory has a frame defined
                returnFrame = 'frame-' + childCat.frameName;
              } // Increment the index


              index += parentCat.subcatIdLength; // Update the parent category

              parentId_1 = childId_1;
              parentCat = childCat;
            } else {
              console.warn('Invalid subcategory id: ' + childId_1);
              return "break";
            }
          } else {
            return "break";
          }
        } else {
          return "break";
        }
      }; // Traverse the hierarchy


      while (index < sidc.length) {
        var state_1 = _loop_1();

        if (state_1 === "break") break;
      }
    } else {
      console.warn('Invalid category id: ' + parentId_1);
    }
  }

  return returnFrame;
}
/**
 * Finds a Frame Definition from the symbol map
 * Ignores case
 *
 * @param frameName Name of frame to find
 * @returns If found, the Frame Definition, else undefined
 */


function findFrameDefinition(frameName) {
  var frameDef;

  if (frameName && frameName.length > 0) {
    if (symbolMap.frames) {
      frameDef = symbolMap.frames.find(function (frame) {
        if (frame.frameName && frame.frameName.toLocaleUpperCase() === frameName.toLocaleUpperCase()) {
          return frame;
        }
      });
    }

    if (!frameDef) {
      console.warn('Did not find specified frame using ' + frameName);
    }
  } else {
    console.error('Invalid frameName');
  }

  return frameDef;
}
/**
 * Finds the corresponding asset for the given name
 * Ignores case
 *
 * @param name The name of the asset
 * @param prefix prefix to use in asset search
 * @returns If found, the name of the asset, else undefined
 */


function findAssetName(name, prefix) {
  var assetName = (prefix ? prefix : '') + name;
  return Object.keys(_svgAssets.SVGAssets).find(function (key) {
    if (key.toLocaleUpperCase() === assetName.toLocaleUpperCase()) {
      // Found the svg asset
      return key;
    }
  });
}
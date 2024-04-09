var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Copyright (c) Dignitas Technologies, LLC
 *
 * This file and its contents are governed by one or more distribution and
 * copyright statements as described in the LICENSE.txt file distributed with
 * this work.
 */
// returns a window with a document and an svg root node
// note: cannot use import for some reason
// eslint-disable-next-line @typescript-eslint/no-var-requires
var _a = require('svgdom'), createSVGWindow = _a.createSVGWindow, config = _a.config;
var window = createSVGWindow();
import { SVG, Path, Shape, Circle, registerWindow } from '@svgdotjs/svg.js';
registerWindow(window, window.document);
import { SVGAssets } from './svg-assets.model';
import { getFrame, findFrameDefinition, findAssetName } from './symbol-map';
import { styleDefaults, DecoratorLocation } from './style';
import { badgeDefaults } from './badge';
import { decoratorDefaults } from './decorator';
export var SVGAssetMap = SVGAssets;
/**
 * Set up the fonts
 * Had to manually add these to fontkit as the browserify wasn't
 * properly handling the openSync (more importantly the fs.readFileSync) call
 * Note, the fonts are only needed for determining measurements
 * Currently using the Work Sans open source sans serif font
 * There is also an Open Sans open source sans serif font embedded in the svgdom pkg
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
var fs = require('fs'); // This require will get replaced via brfs during browserify
import fontkit from 'fontkit';
config.setFontFamilyMappings({
    'Work Sans': 'WorkSans-Regular.ttf',
    'Work Sans Bold': 'WorkSans-Bold.ttf'
});
var fonts = config.getFonts();
var buffer = fs.readFileSync('./fonts/WorkSans/WorkSans-Regular.ttf');
fonts['Work Sans'] = fontkit.create(buffer);
buffer = fs.readFileSync('./fonts/WorkSans/WorkSans-Bold.ttf');
fonts['Work Sans Bold'] = fontkit.create(buffer);
var noFill = '#FFFFFF00';
var defaultViewBoxWidth = 100;
var defaultViewBoxHeight = 100;
var defaultAnchor = { x: defaultViewBoxWidth * 0.5, y: defaultViewBoxHeight * 0.5 };
var defaultDecoratorRadius = 10;
var defaultDecoratorPadding = 4;
var defaultDecoratorOffsetY = defaultDecoratorRadius + defaultDecoratorPadding;
// Decorator offset maps
var decX = [[50], [39, 61], [28, 50, 72], [28, 50, 72, 50], [28, 50, 72, 39, 61], [28, 50, 72, 28, 50, 72]];
var decY = [-defaultDecoratorOffsetY, defaultViewBoxHeight + defaultDecoratorOffsetY];
/**
 * Symbol Type
 */
var Symbol = /** @class */ (function () {
    function Symbol(sidc, style, badge, decorators) {
        var _this = this;
        if (sidc) {
            this.sidc = sidc;
            this.frame = getFrame(sidc);
        }
        else {
            this.sidc = '';
        }
        // Set the defaults
        this.style = styleDefaults;
        if (style) {
            // Merge the arguments that were set
            this.style = __assign(__assign({}, this.style), style);
        }
        if (badge) {
            // Merge the arguments that were set with the defaults
            this.badge = __assign(__assign({}, badgeDefaults), badge);
        }
        if (decorators && decorators.length > 0) {
            this.decorators = [];
            decorators.forEach(function (partDec) {
                var _a;
                // Merge the arguments that were set with the defaults
                (_a = _this.decorators) === null || _a === void 0 ? void 0 : _a.push(__assign(__assign({}, decoratorDefaults), partDec));
            });
        }
        this.width = defaultViewBoxWidth;
        this.height = defaultViewBoxHeight;
        // The anchor point for the current symbol
        this.symbolAnchor = { x: defaultAnchor.x, y: defaultAnchor.y };
        // If we were able to find a valid icon or not.
        this.validIcon = true;
    }
    //TODO: case sensitivity
    /**
     * Returns an SVG element as a string
     */
    Symbol.prototype.asSVG = function () {
        var _this = this;
        var svgContainer = SVG().namespace().viewbox(0, 0, defaultViewBoxWidth, defaultViewBoxHeight);
        // Create a root group
        var svgRootGroup = svgContainer.group().id('root');
        //TODO: Use SVG.Color
        /**
         * Configure Frame
         */
        if (this.style.frame) {
            // Frame enabled
            /**
             * Configure the Frame Override
             */
            if (this.style.frameName) {
                // Frame override set, ensure the frame exists
                this.frame = findAssetName(this.style.frameName, 'frame-');
                if (!this.frame) {
                    // Didn't find the frame asset, check custom frames
                    this.frame = findFrameDefinition(this.style.frameName);
                }
            }
            if (this.frame) {
                var frameGroup_1 = svgRootGroup.group().id('frame');
                // Has a frame
                if (Object.prototype.hasOwnProperty.call(this.frame, 'framePath')) {
                    // Object is custom Frame path
                    var framePath = this.frame.framePath;
                    if (framePath) {
                        frameGroup_1.path(framePath);
                    }
                    //TODO: is frameColor set on this frame object
                }
                else if (typeof this.frame == 'string') {
                    // Object is frame asset name string
                    var frameSvg = SVGAssetMap[this.frame];
                    if (frameSvg) {
                        // Import the Frame Asset into temporary SVG Container
                        var frameContainer = SVG(frameSvg);
                        //TODO: May need to fix this when viewbox adjustments are implemented
                        // Update the primary viewbox based on the imported frame's viewbox
                        svgContainer.viewbox(frameContainer.viewbox());
                        // Move any children from the temporary SVG into the root group of the SVG Container
                        frameContainer.children().forEach(function (c) {
                            if (c instanceof Shape) {
                                c.toParent(frameGroup_1);
                            }
                        });
                    }
                }
                /**
                 * Style the paths
                 */
                var paths = frameGroup_1.find('path');
                paths.forEach(function (p) {
                    if (p instanceof Path) {
                        // Don't fill when using monoColor
                        if (_this.style.fill && !_this.style.monoColor) {
                            p.fill(_this.style.fillColor);
                            p.attr({ 'fill-opacity': _this.style.fillOpacity });
                        }
                        // Draw paths with monoColor if set, otherwise use frameColor
                        p.stroke(_this.style.monoColor || _this.style.frameColor);
                        p.attr({ 'stroke-width': _this.style.frameWidth });
                    }
                });
                /**
                 * Style the circles
                 */
                var circles = frameGroup_1.find('circle');
                circles.forEach(function (c) {
                    if (c instanceof Circle) {
                        // Don't fill when using monoColor
                        if (_this.style.fill && !_this.style.monoColor) {
                            c.fill(_this.style.fillColor);
                            c.attr({ 'fill-opacity': _this.style.fillOpacity });
                        }
                        // Draw paths with monoColor if set, otherwise use frameColor
                        c.stroke(_this.style.monoColor || _this.style.frameColor);
                        c.attr({ 'stroke-width': _this.style.frameWidth });
                    }
                });
                //TODO: Other shapes or just use shape, depends on how fill works
            }
        } // End Frame Configuration
        /**
         * Configure monoColor root
         */
        if (this.style.monoColor || !this.style.fill) {
            // Transparent fill at root, when monoColor is on or fill is off
            svgContainer.fill('#FFFFFF00'); //TODO: move hard code
        } // End MonoColor Configuration
        /**
         * Configure Inner Icon
         */
        if (this.style.icon) {
            var svgIcon = findAssetName(this.sidc, 'icon-');
            if (svgIcon) {
                // Create a group for this icon
                var iconGroup_1 = svgRootGroup.group().id('icon');
                // Retrieve the svg string
                var iconSvg = SVGAssetMap[svgIcon];
                if (iconSvg) {
                    // Create the svg element
                    var iconContainer = SVG(iconSvg);
                    // Move all the svg children to the main svg
                    iconContainer.children().forEach(function (c) {
                        if (c instanceof Shape) {
                            var attributes = c.attr();
                            var hasStroke = Object.prototype.hasOwnProperty.call(attributes, 'stroke');
                            var hasFill = Object.prototype.hasOwnProperty.call(attributes, 'fill');
                            var hasStrokeWidth = Object.prototype.hasOwnProperty.call(attributes, 'stroke-width');
                            if (!hasStrokeWidth) {
                                // Default the icon stroke width if it wasn't set
                                c.attr({ 'stroke-width': _this.style.iconStrokeWidth });
                            }
                            //TODO: not sure which of stroke/fill need to be set or both
                            // Override stroke and fill colors if monoColor is set
                            if (_this.style.monoColor) {
                                // Set stroke to monoColor if set
                                c.stroke(_this.style.monoColor);
                                if (hasFill) {
                                    // If fill is set, change to monoColor
                                    c.attr('fill', _this.style.monoColor);
                                }
                            }
                            else {
                                if (_this.style.iconColor) {
                                    // Set stroke to iconColor if set
                                    c.stroke(_this.style.iconColor);
                                    if (hasFill) {
                                        // If fill is set, change to iconColor
                                        c.attr('fill', _this.style.iconColor);
                                    }
                                }
                                else {
                                    if (!hasStroke) {
                                        if (hasFill) {
                                            // has a fill but no stroke, set stroke to fill color
                                            c.stroke(c.attr('fill'));
                                        }
                                        else {
                                            // has no fill or stroke, set stroke to black
                                            c.stroke('black');
                                        }
                                    }
                                    if (!hasFill) {
                                        if (hasStroke) {
                                            c.fill(c.attr('stroke'));
                                        }
                                        else {
                                            c.fill('black');
                                        }
                                    }
                                }
                            }
                            // Add the Shape to the output svg
                            iconGroup_1.add(c);
                        }
                    });
                }
                iconGroup_1.scale(this.style.iconScale, this.style.iconScale, defaultAnchor.x, defaultAnchor.y);
            }
            else {
                console.log('No inner icon found for ' + this.sidc);
            }
        } // End Icon Configuration
        /**
         * Configure Badge
         */
        if (this.badge) {
            // Create a group for the badge
            var badgeGroup = svgRootGroup.group().id('badge');
            var count = this.badge.badgeCount.toFixed(0);
            if (this.badge.badgeCount > 9) {
                count = '9+';
            }
            var diameter = this.badge.badgeRadius * 2;
            badgeGroup
                .circle(diameter)
                .cx(this.badge.badgeRadius)
                .cy(this.badge.badgeRadius)
                .fill(this.badge.badgeFillColor)
                .stroke(this.badge.badgeTextColor);
            badgeGroup
                .plain(count)
                .font({
                family: 'Work Sans, sans-serif',
                size: this.badge.badgeFontSize,
                anchor: 'middle',
                weight: 'bold' // attr:font-weight
            })
                //TODO: canvas doesn't handle this
                // .font('dominant-baseline', 'middle')
                .dx(this.badge.badgeRadius)
                .dy(this.badge.badgeRadius + this.badge.badgeRadius * this.badge.badgeBaselineAdjust)
                .fill(this.badge.badgeTextColor);
        } // End Badge Configuration
        /**
         * Configure Decorators
         */
        if (this.decorators && this.decorators.length > 0) {
            // Create a group for the decorators
            var decGroup_1 = svgRootGroup.group().id('decorators');
            var dloc = this.style.decoratorLocation.toUpperCase();
            var eloc = dloc;
            var decoratorLocation = DecoratorLocation[eloc];
            var decSlots = void 0;
            if (decoratorLocation === DecoratorLocation.BOTH) {
                // both
                decSlots = 6;
            }
            else if (decoratorLocation === DecoratorLocation.TOP) {
                // top
                decSlots = 3;
            }
            else {
                // bottom
                decSlots = 3;
            }
            var decCount_1 = Math.min(decSlots, this.style.decoratorMaxCount, this.decorators.length);
            var diameter_1 = defaultDecoratorRadius * 2;
            var i_1 = decCount_1 - 1;
            var j_1 = 0;
            var k_1 = decoratorLocation === DecoratorLocation.BOTTOM ? 1 : 0;
            this.decorators.forEach(function (d) {
                if (decCount_1 > j_1) {
                    // break doesn't work the same in typescript
                    var decAssetName = findAssetName(d.name, 'dec-');
                    if (decAssetName) {
                        var decAsset = SVGAssetMap[decAssetName];
                        if (decAsset) {
                            // Toggle k so that the other y is used
                            if (j_1 === 3) {
                                k_1 = k_1 === 0 ? 1 : 0;
                            }
                            if (d.frame) {
                                // Draw the decorator frame, monoColor overrides frameColor if set
                                var circle = decGroup_1
                                    .circle(diameter_1)
                                    .cx(decX[i_1][j_1])
                                    .cy(decY[k_1])
                                    .stroke(d.monoColor || d.frameColor);
                                if (d.fill) {
                                    circle.fill(d.fillColor).attr({ 'fill-opacity': d.fillOpacity });
                                }
                                else {
                                    circle.attr({ 'fill-opacity': 0 });
                                }
                            }
                            var innerDecGroup_1 = decGroup_1.group().id('dec-' + j_1);
                            var decContainer = SVG(decAsset);
                            decContainer.children().forEach(function (c) {
                                if (c instanceof Shape) {
                                    innerDecGroup_1.add(c);
                                }
                            });
                            // Draw the decorator icon, monoColor overrides iconColor if set
                            innerDecGroup_1
                                .stroke(d.monoColor || d.iconColor)
                                .fill(d.monoColor || d.iconColor)
                                .transform({
                                positionX: decX[i_1][j_1],
                                positionY: decY[k_1],
                                scale: d.scale
                            });
                            // Increment the decorator position
                            j_1++;
                        }
                    }
                }
            });
        } // End Decorator Configuration
        var vbox = svgContainer.viewbox();
        /**
         * Configure Dimensions
         */
        var paddingDouble = this.style.padding * 2;
        // Viewbox
        var x1 = vbox.x - this.style.padding - this.style.frameWidth * 0.5;
        var y1 = this.style.decoratorMaxCount > 0 ? -(defaultDecoratorRadius * 2 + defaultDecoratorPadding * 2) : 0;
        var w = vbox.width + paddingDouble + this.style.frameWidth;
        var h = vbox.height +
            paddingDouble +
            (this.style.decoratorMaxCount > 0 ? defaultDecoratorRadius * 4 + defaultDecoratorPadding * 4 : 0);
        // Size
        var sizeX = w >= h ? this.style.size : (this.style.size * w) / h;
        var sizeY = h >= w ? this.style.size : (this.style.size * h) / w;
        /**
         * Configure Outline
         */
        if (this.style.outline) {
            var a = defaultViewBoxHeight * 0.5 + defaultDecoratorOffsetY;
            var b = defaultViewBoxWidth * 0.5 - decX[2][0];
            var radius = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) + defaultDecoratorOffsetY;
            var diameter = radius * 2;
            svgRootGroup
                .circle(diameter)
                .id('outline')
                .center(defaultAnchor.x, defaultAnchor.y)
                .stroke(this.style.outlineColor)
                .fill(noFill)
                .attr({ 'stroke-width': this.style.outlineWidth });
            x1 = y1 = 50 - radius - this.style.outlineWidth * 0.5 - this.style.padding;
            var newWidth = diameter + this.style.outlineWidth + paddingDouble;
            var newHeight = newWidth;
            var hR = h !== 0 ? newHeight / h : 1;
            var wR = w !== 0 ? newWidth / w : 1;
            w = newWidth;
            h = newHeight;
            sizeX = sizeY *= Math.min(hR, wR);
        } // End Outline Configuration
        this.symbolAnchor.x = sizeX * 0.5;
        this.symbolAnchor.y = sizeY * 0.5;
        /**
         * Configure Labels
         */
        if (this.style.name && this.style.name.length > 0) {
            var nameText = SVG().plain(this.style.name).font({
                // svg.js does not handle weights when measuring, so set to bold font file manually
                family: 'Work Sans Bold',
                size: this.style.nameFontSize,
                anchor: 'start',
                weight: 'bold' // attr:font-weight
            });
            //TODO: canvas doesn't handle this
            // .font('dominant-baseline', 'bottom')
            var nameBg = nameText.clone().attr('stroke', this.style.nameBgColor).attr('stroke-width', '0.25em');
            // Now set it back to the base so that clients can use the weight attribute appropriately
            nameText.font({ family: 'Work Sans, sans-serif' });
            nameBg.font({ family: 'Work Sans, sans-serif' });
            // Force measurements
            var textBox = nameBg.bbox();
            var textX = textBox.width;
            var textY = textBox.height;
            nameText.fill(this.style.nameColor);
            // Create a group for the labels
            var labelGroup = svgRootGroup.group().id('name');
            var dx = defaultViewBoxWidth + this.style.frameWidth * 0.5 + this.style.padding;
            labelGroup
                .add(nameBg)
                .add(nameText)
                .dx(dx)
                .dy(defaultAnchor.y + textY * 0.25); // you'd think this adjustment would be 0.5
            var addWidth = dx + textX + this.style.padding - w - x1;
            if (addWidth > 0) {
                var newWidth = w + textX + this.style.padding;
                sizeX *= newWidth / w;
                w = newWidth;
            }
        } // End Label Configuration
        /**
         * Configure Size
         */
        svgContainer.size(sizeX, sizeY);
        svgContainer.viewbox(x1, y1, w, h);
        this.width = sizeX;
        this.height = sizeY;
        // add center and dimension formatted as <desc>ctr:x=76,y=76:dim:x=152,y=152</desc>
        var descString = 'ctr:x=' +
            this.symbolAnchor.x +
            ',y=' +
            (this.symbolAnchor.y - this.style.padding) +
            ':dim:x=' +
            sizeX +
            ',y=' +
            sizeY;
        svgContainer.element('desc').words(descString);
        return svgContainer.svg();
    };
    return Symbol;
}());
export { Symbol };

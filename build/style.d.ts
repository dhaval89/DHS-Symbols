/**
 * Copyright (c) Dignitas Technologies, LLC
 *
 * This file and its contents are governed by one or more distribution and
 * copyright statements as described in the LICENSE.txt file distributed with
 * this work.
 */
export declare enum DecoratorLocation {
    BOTH = 0,
    TOP = 1,
    BOTTOM = 2
}
/**
 * Icon Style Options
 */
export interface StyleOptions {
    decoratorLocation: string;
    decoratorMaxCount: number;
    fill: boolean;
    fillColor: string;
    fillOpacity: number;
    frame: boolean;
    frameName: string;
    frameColor: string;
    frameWidth: number;
    icon: boolean;
    iconScale: number;
    iconColor?: string;
    iconStrokeWidth: number;
    monoColor?: string;
    name?: string;
    nameBgColor: string;
    nameColor: string;
    nameFontSize: number;
    outline: boolean;
    outlineColor: string;
    outlineWidth: number;
    padding: number;
    size: number;
    standard: string;
}
/**
 * Icon Style Validation constant
 */
export declare const styleValidation: Required<StyleOptions>;
/**
 * Icon Style Defaults constant
 */
export declare const styleDefaults: StyleOptions;

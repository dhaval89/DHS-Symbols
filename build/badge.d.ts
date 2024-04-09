/**
 * Copyright (c) Dignitas Technologies, LLC
 *
 * This file and its contents are governed by one or more distribution and
 * copyright statements as described in the LICENSE.txt file distributed with
 * this work.
 */
/**
 * Icon Badge Options
 */
export interface BadgeOptions {
    badgeCount: number;
    badgeRadius: number;
    badgeFontSize: number;
    badgeTextColor: string;
    badgeFillColor: string;
    badgeBaselineAdjust: number;
}
/**
 * Icon Badge Validation constant
 */
export declare const badgeValidation: Required<BadgeOptions>;
/**
 * Icon Badge Defaults constant
 */
export declare const badgeDefaults: BadgeOptions;

/**
 * Copyright (c) Dignitas Technologies, LLC
 *
 * This file and its contents are governed by one or more distribution and
 * copyright statements as described in the LICENSE.txt file distributed with
 * this work.
 */
import { KVMap } from './options';
export interface Decorator {
    name: string;
    scale: number;
    fill: boolean;
    fillColor: string;
    fillOpacity: number;
    frame: boolean;
    frameColor: string;
    iconColor: string;
    monoColor?: string;
}
export declare const decoratorValidation: Required<Decorator>;
export declare const decoratorDefaults: Decorator;
export declare function validateDecorators(props: KVMap): undefined | Partial<Decorator>[];

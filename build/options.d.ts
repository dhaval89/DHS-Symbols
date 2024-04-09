/**
 * Copyright (c) Dignitas Technologies, LLC
 *
 * This file and its contents are governed by one or more distribution and
 * copyright statements as described in the LICENSE.txt file distributed with
 * this work.
 */
export interface KVMap {
    [key: string]: any;
}
export declare function validateOptions(props: KVMap, validation: KVMap): KVMap;

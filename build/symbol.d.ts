declare module '@svgdotjs/svg.js' {
    function registerWindow(window: any, document: any): void;
}
import { FrameDefinition } from './symbol-map';
import { StyleOptions } from './style';
import { BadgeOptions } from './badge';
import { Decorator } from './decorator';
import { KVMap } from './options';
export declare const SVGAssetMap: KVMap;
/**
 * Point Type
 */
interface Point {
    x: number;
    y: number;
}
/**
 * Symbol Type
 */
export declare class Symbol {
    sidc: string;
    style: StyleOptions;
    badge: BadgeOptions | undefined;
    decorators: Decorator[] | undefined;
    frame: FrameDefinition | string | undefined;
    symbolAnchor: Point;
    width: number;
    height: number;
    validIcon: boolean;
    constructor(sidc?: string, style?: Partial<StyleOptions>, badge?: Partial<BadgeOptions>, decorators?: Partial<Decorator>[]);
    /**
     * Returns an SVG element as a string
     */
    asSVG(): string;
}
export {};

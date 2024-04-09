/**
 * Definable Frame Type
 */
export interface FrameDefinition {
    frameName: string;
    framePath?: string;
    frameColor?: string;
}
export declare const getSymbolMap: string;
export declare const isSymbolMapValid: boolean;
/**
 * Retrieve the frame for the given sidc
 *
 * @param sidc the symbol id code
 * @returns the mapped frame as a frame asset name or a frame definition, undefined if not mapped
 */
export declare function getFrame(sidc: string): FrameDefinition | string | undefined;
/**
 * Finds a Frame Definition from the symbol map
 * Ignores case
 *
 * @param frameName Name of frame to find
 * @returns If found, the Frame Definition, else undefined
 */
export declare function findFrameDefinition(frameName: string): FrameDefinition | undefined;
/**
 * Finds the corresponding asset for the given name
 * Ignores case
 *
 * @param name The name of the asset
 * @param prefix prefix to use in asset search
 * @returns If found, the name of the asset, else undefined
 */
export declare function findAssetName(name: string, prefix?: string): string | undefined;

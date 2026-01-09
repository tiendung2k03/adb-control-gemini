/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FileSearchResult } from './types.js';
export declare class FileHandler {
    private static readonly OUTPUT_DIR;
    private static readonly SEARCH_PATHS;
    static ensureOutputDirectory(): string;
    static findInputFile(filename: string): FileSearchResult;
    static generateFilename(prompt: string, format?: 'png' | 'jpeg', index?: number): string;
    static saveImageFromBase64(base64Data: string, outputPath: string, filename: string): Promise<string>;
    static readImageAsBase64(filePath: string): Promise<string>;
}

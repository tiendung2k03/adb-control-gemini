/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var _a;
import * as fs from 'fs';
import * as path from 'path';
export class FileHandler {
    static ensureOutputDirectory() {
        const outputPath = path.join(process.cwd(), this.OUTPUT_DIR);
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }
        return outputPath;
    }
    static findInputFile(filename) {
        if (path.isAbsolute(filename) && fs.existsSync(filename)) {
            return {
                found: true,
                filePath: filename,
                searchedPaths: [],
            };
        }
        const searchPaths = this.SEARCH_PATHS;
        for (const searchPath of searchPaths) {
            const fullPath = path.join(searchPath, filename);
            if (fs.existsSync(fullPath)) {
                return {
                    found: true,
                    filePath: fullPath,
                    searchedPaths: searchPaths,
                };
            }
        }
        return {
            found: false,
            searchedPaths: searchPaths,
        };
    }
    static generateFilename(prompt, format = 'png', index = 0) {
        // Create user-friendly filename from prompt
        let baseName = prompt
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, '_') // Replace spaces with underscores
            .substring(0, 32); // Limit to 32 characters
        if (!baseName) {
            baseName = 'generated_image';
        }
        const extension = format === 'jpeg' ? 'jpg' : 'png';
        // Check for existing files and add counter if needed
        const outputPath = this.ensureOutputDirectory();
        let fileName = `${baseName}.${extension}`;
        let counter = index > 0 ? index : 1;
        while (fs.existsSync(path.join(outputPath, fileName))) {
            fileName = `${baseName}_${counter}.${extension}`;
            counter++;
        }
        return fileName;
    }
    static async saveImageFromBase64(base64Data, outputPath, filename) {
        const buffer = Buffer.from(base64Data, 'base64');
        const fullPath = path.join(outputPath, filename);
        await fs.promises.writeFile(fullPath, buffer);
        return fullPath;
    }
    static async readImageAsBase64(filePath) {
        const buffer = await fs.promises.readFile(filePath);
        return buffer.toString('base64');
    }
}
_a = FileHandler;
FileHandler.OUTPUT_DIR = 'nanobanana-output';
FileHandler.SEARCH_PATHS = [
    process.cwd(),
    path.join(process.cwd(), 'images'),
    path.join(process.cwd(), 'input'),
    path.join(process.cwd(), _a.OUTPUT_DIR),
    path.join(process.env.HOME || '~', 'Downloads'),
    path.join(process.env.HOME || '~', 'Desktop'),
];

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ImageGenerationRequest, ImageGenerationResponse, AuthConfig, StorySequenceArgs } from './types.js';
export declare class ImageGenerator {
    private ai;
    private modelName;
    private static readonly DEFAULT_MODEL;
    constructor(authConfig: AuthConfig);
    private openImagePreview;
    private shouldAutoPreview;
    private handlePreview;
    static validateAuthentication(): AuthConfig;
    private isValidBase64ImageData;
    private buildBatchPrompts;
    generateTextToImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse>;
    private handleApiError;
    generateStorySequence(request: ImageGenerationRequest, args?: StorySequenceArgs): Promise<ImageGenerationResponse>;
    editImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse>;
}

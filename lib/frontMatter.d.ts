/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { TutorialFrontMatter } from '@niklasp/plugin-content-tutorials';
export declare function validateTutorialFrontMatter(frontMatter: {
    [key: string]: unknown;
}): TutorialFrontMatter;

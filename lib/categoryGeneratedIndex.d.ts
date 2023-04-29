/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type SidebarsUtils } from './sidebars/utils';
import type { CategoryGeneratedIndexMetadata, DocMetadataBase } from '@niklasp/plugin-content-tutorials';
export declare function getCategoryGeneratedIndexMetadataList({ tutorials, sidebarsUtils, }: {
    sidebarsUtils: SidebarsUtils;
    tutorials: DocMetadataBase[];
}): CategoryGeneratedIndexMetadata[];

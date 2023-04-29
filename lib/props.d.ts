/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { VersionTag } from './types';
import type { PropSidebars, PropVersionMetadata, PropTagDocList, DocMetadata, LoadedVersion } from '@niklasp/plugin-content-tutorials';
export declare function toSidebarsProp(loadedVersion: LoadedVersion): PropSidebars;
export declare function toVersionMetadataProp(pluginId: string, loadedVersion: LoadedVersion): PropVersionMetadata;
export declare function toTagDocListProp({ allTagsPath, tag, tutorials, }: {
    allTagsPath: string;
    tag: VersionTag;
    tutorials: DocMetadata[];
}): PropTagDocList;

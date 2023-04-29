/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { NumberPrefixParser, DocMetadataBase } from '@niklasp/plugin-content-tutorials';
export default function getSlug({ baseID, frontMatterSlug, source, sourceDirName, stripDirNumberPrefixes, numberPrefixParser, }: {
    baseID: string;
    frontMatterSlug?: string;
    source: DocMetadataBase['source'];
    sourceDirName: DocMetadataBase['sourceDirName'];
    stripDirNumberPrefixes?: boolean;
    numberPrefixParser?: NumberPrefixParser;
}): string;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { PluginOptions } from '@niklasp/plugin-content-tutorials';
import type { LoadContext } from '@docusaurus/types';
export declare function cliDocsVersionCommand(version: unknown, { id: pluginId, path: docsPath, sidebarPath }: PluginOptions, { siteDir, i18n }: LoadContext): Promise<void>;

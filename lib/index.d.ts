/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { PluginOptions, LoadedContent } from '@niklasp/plugin-content-tutorials';
import type { LoadContext, Plugin } from '@docusaurus/types';
export default function pluginContentTutorials(context: LoadContext, options: PluginOptions): Promise<Plugin<LoadedContent>>;
export { validateOptions } from './options';

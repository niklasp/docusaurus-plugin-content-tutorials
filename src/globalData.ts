/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import _ from 'lodash';
import {getMainDocId} from './docs';
import type {FullVersion} from './types';
import type {
  CategoryGeneratedIndexMetadata,
  DocMetadata,
} from '@niklasp/plugin-content-tutorials';
import type {
  GlobalVersion,
  GlobalSidebar,
  GlobalDoc,
} from './client/index';
import type {Sidebars} from './sidebars/types';

function toGlobalDataDoc(tutorial: DocMetadata): GlobalDoc {
  return {
    id: tutorial.unversionedId,
    path: tutorial.permalink,
    sidebar: tutorial.sidebar,
  };
}

function toGlobalDataGeneratedIndex(
  doc: CategoryGeneratedIndexMetadata,
): GlobalDoc {
  return {
    id: doc.slug,
    path: doc.permalink,
    sidebar: doc.sidebar,
  };
}

function toGlobalSidebars(
  sidebars: Sidebars,
  version: FullVersion,
): {[sidebarId: string]: GlobalSidebar} {
  return _.mapValues(sidebars, (sidebar, sidebarId) => {
    const firstLink = version.sidebarsUtils.getFirstLink(sidebarId);
    if (!firstLink) {
      return {};
    }
    return {
      link: {
        path:
          firstLink.type === 'generated-index'
            ? firstLink.permalink
            : version.tutorials.find(
                (tutorial) =>
                  tutorial.id === firstLink.id || tutorial.unversionedId === firstLink.id,
              )!.permalink,
        label: firstLink.label,
      },
    };
  });
}

export function toGlobalDataVersion(version: FullVersion): GlobalVersion {
  return {
    name: version.versionName,
    label: version.label,
    isLast: version.isLast,
    path: version.path,
    mainDocId: getMainDocId(version),
    tutorials: version.tutorials
      .map(toGlobalDataDoc)
      .concat(version.categoryGeneratedIndices.map(toGlobalDataGeneratedIndex)),
    draftIds: version.drafts.map((doc) => doc.unversionedId),
    sidebars: toGlobalSidebars(version.sidebars, version),
  };
}

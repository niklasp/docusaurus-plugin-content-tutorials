/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {type SidebarsUtils, toNavigationLink} from './sidebars/utils';
import {createDocsByIdIndex} from './docs';
import type {
  CategoryGeneratedIndexMetadata,
  DocMetadataBase,
} from '@niklasp/plugin-content-tutorials';
import type {SidebarItemCategoryWithGeneratedIndex} from './sidebars/types';

function getCategoryGeneratedIndexMetadata({
  category,
  sidebarsUtils,
  docsById,
}: {
  category: SidebarItemCategoryWithGeneratedIndex;
  sidebarsUtils: SidebarsUtils;
  docsById: {[docId: string]: DocMetadataBase};
}): CategoryGeneratedIndexMetadata {
  const {sidebarName, previous, next} =
    sidebarsUtils.getCategoryGeneratedIndexNavigation(category.link.permalink);
  return {
    title: category.link.title ?? category.label,
    description: category.link.description,
    image: category.link.image,
    keywords: category.link.keywords,
    slug: category.link.slug,
    permalink: category.link.permalink,
    sidebar: sidebarName!,
    navigation: {
      previous: toNavigationLink(previous, docsById),
      next: toNavigationLink(next, docsById),
    },
  };
}

export function getCategoryGeneratedIndexMetadataList({
  tutorials,
  sidebarsUtils,
}: {
  sidebarsUtils: SidebarsUtils;
  tutorials: DocMetadataBase[];
}): CategoryGeneratedIndexMetadata[] {
  const docsById = createDocsByIdIndex(tutorials);

  const categoryGeneratedIndexItems =
    sidebarsUtils.getCategoryGeneratedIndexList();
  return categoryGeneratedIndexItems.map((category) =>
    getCategoryGeneratedIndexMetadata({
      category,
      sidebarsUtils,
      docsById,
    }),
  );
}

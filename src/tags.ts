/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import _, {pick} from 'lodash';
import {groupBy} from 'lodash';
import {Tag, groupTaggedItems} from '@docusaurus/utils';
import type {VersionTags} from './types';
import type {DocMetadata} from '@niklasp/plugin-content-tutorials';

type TaggedItemGroup<Item> = {
  tag: Tag;
  items: Item[];
};

/**
 * Permits to group docs/blog posts by tag (provided by front matter).
 *
 * @returns a map from tag permalink to the items and other relevant tag data.
 * The record is indexed by permalink, because routes must be unique in the end.
 * Labels may vary on 2 MD files but they are normalized. Docs with
 * label='some label' and label='some-label' should end up in the same page.
 */
export function groupTaggedItemsByLabel<Item>(
  items: readonly Item[],
  /**
   * A callback telling me how to get the tags list of the current item. Usually
   * simply getting it from some metadata of the current item.
   */
  getItemTags: (item: Item) => readonly Tag[],
): {[permalink: string]: TaggedItemGroup<Item | Partial<Item>>} {
  const result: {[permalink: string]: TaggedItemGroup<Item | Partial<Item>>} =
    {};

  items.forEach((item) => {
    getItemTags(item).forEach((tag) => {
      // Init missing tag groups
      // TODO: it's not really clear what should be the behavior if 2 tags have
      // the same permalink but the label is different for each
      // For now, the first tag found wins
      result[tag.label] ??= {
        tag,
        items: [],
      };

      // Add item to group
      result[tag.label]!.items.push(
        // item,
        {
          ...pick(item, [
            'title',
            'description',
            'permalink',
            'tags',
            'lastUpdatedAt',
            'level',
            'duration',
          ]),
        },
        // pick(item, [
        //   'frontMatter',
        //   'frontMatter.tags',
        //   'frontMatter.description',
        //   'frontMatter.duration',
        //   'frontMatter.level',
        //   'frontMatter.updated',
        //   'frontMatter.title',
        // ]),
      );
    });
  });

  // If user add twice the same tag to a md doc (weird but possible),
  // we don't want the item to appear twice in the list...
  Object.values(result).forEach((group) => {
    group.items = _.uniq(group.items);
  });

  return result;
}

export function getVersionTags(tutorials: DocMetadata[]): VersionTags {
  const groups = groupTaggedItems(tutorials, (tutorial) => tutorial.tags);
  return _.mapValues(groups, (group) => ({
    label: group.tag.label,
    tutorialIds: group.items.map((item) => item.id),
    permalink: group.tag.permalink,
  }));
}

export function getTaggedTutorials(tutorials: DocMetadata[]): any {
  const groups = groupTaggedItemsByLabel(
    tutorials,
    (tutorial) => tutorial.tags,
  );

  return groups;
}

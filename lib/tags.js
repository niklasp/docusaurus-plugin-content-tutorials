"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaggedTutorials =
  exports.getVersionTags =
  exports.groupTaggedItemsByLabel =
    void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importStar(require("lodash"));
const utils_1 = require("@docusaurus/utils");
/**
 * Permits to group docs/blog posts by tag (provided by front matter).
 *
 * @returns a map from tag permalink to the items and other relevant tag data.
 * The record is indexed by permalink, because routes must be unique in the end.
 * Labels may vary on 2 MD files but they are normalized. Docs with
 * label='some label' and label='some-label' should end up in the same page.
 */
function groupTaggedItemsByLabel(
  items,
  /**
   * A callback telling me how to get the tags list of the current item. Usually
   * simply getting it from some metadata of the current item.
   */
  getItemTags
) {
  const result = {};
  items.forEach((item) => {
    getItemTags(item).forEach((tag) => {
      var _a;
      const tagDescription = items.find(
        (item) => item.permalink === tag.permalink
      )?.description;
      // Init missing tag groups
      // TODO: it's not really clear what should be the behavior if 2 tags have
      // the same permalink but the label is different for each
      // For now, the first tag found wins
      result[(_a = tag.label)] ??
        (result[_a] = {
          tag: {
            ...tag,
            description: tagDescription ?? "",
          },
          items: [],
        });
      // Add item to group
      result[tag.label].items.push({
        ...(0, lodash_1.pick)(item, [
          "title",
          "description",
          "permalink",
          "tags",
          "lastUpdatedAt",
          "level",
          "duration",
        ]),
      });
    });
  });
  // If user add twice the same tag to a md doc (weird but possible),
  // we don't want the item to appear twice in the list...
  Object.values(result).forEach((group) => {
    group.items = lodash_1.default.uniq(group.items);
  });
  return result;
}
exports.groupTaggedItemsByLabel = groupTaggedItemsByLabel;
function getVersionTags(tutorials) {
  const groups = (0, utils_1.groupTaggedItems)(
    tutorials,
    (tutorial) => tutorial.tags
  );
  return lodash_1.default.mapValues(groups, (group) => ({
    label: group.tag.label,
    tutorialIds: group.items.map((item) => item.id),
    permalink: group.tag.permalink,
  }));
}
exports.getVersionTags = getVersionTags;
function getTaggedTutorials(tutorials) {
  const groups = groupTaggedItemsByLabel(
    tutorials,
    (tutorial) => tutorial.tags
  );
  return groups;
}
exports.getTaggedTutorials = getTaggedTutorials;

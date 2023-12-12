/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Optional, Required } from "utility-types";
import type { NumberPrefixParser, SidebarOptions, CategoryIndexMatcher, DocMetadataBase, VersionMetadata } from "@niklasp/plugin-content-tutorials";
import type { Slugger } from "@docusaurus/utils";
type Expand<T extends {
    [x: string]: unknown;
}> = {
    [P in keyof T]: T[P];
};
export type SidebarItemBase = {
    className?: string;
    customProps?: {
        [key: string]: unknown;
    };
};
export type SidebarItemDoc = SidebarItemBase & {
    type: "doc" | "ref";
    label?: string;
    id: string;
    /**
     * This is an internal marker. Items with labels defined in the config needs
     * to be translated with JSON
     */
    translatable?: true;
};
export type SidebarItemHtml = SidebarItemBase & {
    type: "html";
    value: string;
    defaultStyle?: boolean;
};
export type SidebarItemLink = SidebarItemBase & {
    type: "link";
    href: string;
    label: string;
    autoAddBaseUrl?: boolean;
    description?: string;
};
export type SidebarItemAutogenerated = SidebarItemBase & {
    type: "autogenerated";
    dirName: string;
};
type SidebarItemCategoryBase = SidebarItemBase & {
    type: "category";
    label: string;
    collapsed: boolean;
    collapsible: boolean;
    description?: string;
};
export type SidebarItemCategoryLinkDoc = {
    type: "doc";
    id: string;
};
export type SidebarItemCategoryLinkGeneratedIndexConfig = {
    type: "generated-index";
    slug?: string;
    title?: string;
    description?: string;
    image?: string;
    keywords?: string | readonly string[];
};
export type SidebarItemCategoryLinkGeneratedIndex = {
    type: "generated-index";
    slug: string;
    permalink: string;
    title?: string;
    description?: string;
    image?: string;
    keywords?: string | readonly string[];
};
export type SidebarItemCategoryLinkConfig = SidebarItemCategoryLinkDoc | SidebarItemCategoryLinkGeneratedIndexConfig;
export type SidebarItemCategoryLink = SidebarItemCategoryLinkDoc | SidebarItemCategoryLinkGeneratedIndex;
export type SidebarItemCategoryConfig = Expand<Optional<SidebarItemCategoryBase, "collapsed" | "collapsible"> & {
    items: SidebarCategoriesShorthand | SidebarItemConfig[];
    link?: SidebarItemCategoryLinkConfig;
}>;
export type SidebarCategoriesShorthand = {
    [sidebarCategory: string]: SidebarCategoriesShorthand | SidebarItemConfig[];
};
export type SidebarItemConfig = Omit<SidebarItemDoc, "translatable"> | SidebarItemHtml | SidebarItemLink | SidebarItemAutogenerated | SidebarItemCategoryConfig | string | SidebarCategoriesShorthand;
export type SidebarConfig = SidebarCategoriesShorthand | SidebarItemConfig[];
export type SidebarsConfig = {
    [sidebarId: string]: SidebarConfig;
};
export type NormalizedSidebarItemCategory = Expand<Optional<SidebarItemCategoryBase, "collapsed" | "collapsible"> & {
    items: NormalizedSidebarItem[];
    link?: SidebarItemCategoryLinkConfig;
}>;
export type NormalizedSidebarItem = SidebarItemDoc | SidebarItemHtml | SidebarItemLink | NormalizedSidebarItemCategory | SidebarItemAutogenerated;
export type NormalizedSidebar = NormalizedSidebarItem[];
export type NormalizedSidebars = {
    [sidebarId: string]: NormalizedSidebar;
};
export type ProcessedSidebarItemCategory = Expand<Optional<SidebarItemCategoryBase, "collapsed" | "collapsible"> & {
    items: ProcessedSidebarItem[];
    link?: SidebarItemCategoryLinkConfig;
}>;
export type ProcessedSidebarItem = SidebarItemDoc | SidebarItemHtml | SidebarItemLink | ProcessedSidebarItemCategory;
export type ProcessedSidebar = ProcessedSidebarItem[];
export type ProcessedSidebars = {
    [sidebarId: string]: ProcessedSidebar;
};
export type SidebarItemCategory = Expand<SidebarItemCategoryBase & {
    items: SidebarItem[];
    link?: SidebarItemCategoryLink;
}>;
export type SidebarItemCategoryWithLink = Required<SidebarItemCategory, "link">;
export type SidebarItemCategoryWithGeneratedIndex = SidebarItemCategoryWithLink & {
    link: SidebarItemCategoryLinkGeneratedIndex;
};
export type SidebarItem = SidebarItemDoc | SidebarItemHtml | SidebarItemLink | SidebarItemCategory;
export type SidebarNavigationItem = SidebarItemDoc | SidebarItemCategoryWithLink;
export type Sidebar = SidebarItem[];
export type SidebarItemType = SidebarItem["type"];
export type Sidebars = {
    [sidebarId: string]: Sidebar;
};
export type PropSidebarItemCategory = Expand<SidebarItemCategoryBase & {
    items: PropSidebarItem[];
    href?: string;
    linkUnlisted?: boolean;
}>;
export type PropSidebarItemLink = SidebarItemLink & {
    docId?: string;
    unlisted?: boolean;
};
export type PropSidebarItemHtml = SidebarItemHtml;
export type PropSidebarItem = PropSidebarItemLink | PropSidebarItemCategory | PropSidebarItemHtml;
export type PropSidebar = PropSidebarItem[];
export type PropSidebars = {
    [sidebarId: string]: PropSidebar;
};
export type PropSidebarBreadcrumbsItem = PropSidebarItemLink | PropSidebarItemCategory;
export type CategoryMetadataFile = {
    label?: string;
    position?: number;
    collapsed?: boolean;
    collapsible?: boolean;
    className?: string;
    link?: SidebarItemCategoryLinkConfig | null;
    customProps?: {
        [key: string]: unknown;
    };
};
export type SidebarItemsGeneratorDoc = Pick<DocMetadataBase, "id" | "title" | "frontMatter" | "source" | "sourceDirName" | "sidebarPosition">;
export type SidebarItemsGeneratorVersion = Pick<VersionMetadata, "versionName" | "contentPath">;
export type SidebarItemsGeneratorArgs = {
    /** The sidebar item with type "autogenerated" to be transformed. */
    item: SidebarItemAutogenerated;
    /** Useful metadata for the version this sidebar belongs to. */
    version: SidebarItemsGeneratorVersion;
    /** All the docs of that version (unfiltered). */
    docs: SidebarItemsGeneratorDoc[];
    /** Number prefix parser configured for this plugin. */
    numberPrefixParser: NumberPrefixParser;
    /** The default category index matcher which you can override. */
    isCategoryIndex: CategoryIndexMatcher;
    /**
     * Key is the path relative to the doc content directory, value is the
     * category metadata file's content.
     */
    categoriesMetadata: {
        [filePath: string]: CategoryMetadataFile;
    };
};
export type SidebarItemsGenerator = (generatorArgs: SidebarItemsGeneratorArgs) => NormalizedSidebar | Promise<NormalizedSidebar>;
export type SidebarItemsGeneratorOption = (generatorArgs: {
    /**
     * Useful to re-use/enhance the default sidebar generation logic from
     * Docusaurus.
     * @see https://github.com/facebook/docusaurus/issues/4640#issuecomment-822292320
     */
    defaultSidebarItemsGenerator: SidebarItemsGenerator;
} & SidebarItemsGeneratorArgs) => NormalizedSidebar | Promise<NormalizedSidebar>;
export type SidebarProcessorParams = {
    sidebarItemsGenerator: SidebarItemsGeneratorOption;
    numberPrefixParser: NumberPrefixParser;
    docs: DocMetadataBase[];
    drafts: DocMetadataBase[];
    version: VersionMetadata;
    categoryLabelSlugger: Slugger;
    sidebarOptions: SidebarOptions;
};
export {};

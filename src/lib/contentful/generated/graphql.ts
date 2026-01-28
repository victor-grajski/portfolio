export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Dimension: { input: any; output: any };
  HexColor: { input: any; output: any };
  JSON: { input: any; output: any };
  Quality: { input: any; output: any };
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description: Maybe<Scalars['String']['output']>;
  fileName: Maybe<Scalars['String']['output']>;
  height: Maybe<Scalars['Int']['output']>;
  linkedFrom: Maybe<AssetLinkingCollections>;
  size: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
  width: Maybe<Scalars['Int']['output']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  transform: InputMaybe<ImageTransformOptions>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType: InputMaybe<Scalars['String']['input']>;
  contentType_contains: InputMaybe<Scalars['String']['input']>;
  contentType_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains: InputMaybe<Scalars['String']['input']>;
  contentType_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  description: InputMaybe<Scalars['String']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not: InputMaybe<Scalars['String']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  description_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName: InputMaybe<Scalars['String']['input']>;
  fileName_contains: InputMaybe<Scalars['String']['input']>;
  fileName_exists: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains: InputMaybe<Scalars['String']['input']>;
  fileName_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height: InputMaybe<Scalars['Int']['input']>;
  height_exists: InputMaybe<Scalars['Boolean']['input']>;
  height_gt: InputMaybe<Scalars['Int']['input']>;
  height_gte: InputMaybe<Scalars['Int']['input']>;
  height_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt: InputMaybe<Scalars['Int']['input']>;
  height_lte: InputMaybe<Scalars['Int']['input']>;
  height_not: InputMaybe<Scalars['Int']['input']>;
  height_not_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size: InputMaybe<Scalars['Int']['input']>;
  size_exists: InputMaybe<Scalars['Boolean']['input']>;
  size_gt: InputMaybe<Scalars['Int']['input']>;
  size_gte: InputMaybe<Scalars['Int']['input']>;
  size_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt: InputMaybe<Scalars['Int']['input']>;
  size_lte: InputMaybe<Scalars['Int']['input']>;
  size_not: InputMaybe<Scalars['Int']['input']>;
  size_not_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url: InputMaybe<Scalars['String']['input']>;
  url_contains: InputMaybe<Scalars['String']['input']>;
  url_exists: InputMaybe<Scalars['Boolean']['input']>;
  url_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not: InputMaybe<Scalars['String']['input']>;
  url_not_contains: InputMaybe<Scalars['String']['input']>;
  url_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width: InputMaybe<Scalars['Int']['input']>;
  width_exists: InputMaybe<Scalars['Boolean']['input']>;
  width_gt: InputMaybe<Scalars['Int']['input']>;
  width_gte: InputMaybe<Scalars['Int']['input']>;
  width_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt: InputMaybe<Scalars['Int']['input']>;
  width_lte: InputMaybe<Scalars['Int']['input']>;
  width_not: InputMaybe<Scalars['Int']['input']>;
  width_not_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  projectCollection: Maybe<ProjectCollection>;
};

export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetLinkingCollectionsProjectCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetOrder =
  | 'contentType_ASC'
  | 'contentType_DESC'
  | 'fileName_ASC'
  | 'fileName_DESC'
  | 'height_ASC'
  | 'height_DESC'
  | 'size_ASC'
  | 'size_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'url_ASC'
  | 'url_DESC'
  | 'width_ASC'
  | 'width_DESC';

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists: InputMaybe<Scalars['Boolean']['input']>;
  tags: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  sys: InputMaybe<SysFilter>;
};

export type EntryOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

export type ImageFormat =
  /** AVIF image format. */
  | 'AVIF'
  /** JPG image format. */
  | 'JPG'
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  | 'JPG_PROGRESSIVE'
  /** PNG image format */
  | 'PNG'
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  | 'PNG8'
  /** WebP image format. */
  | 'WEBP';

export type ImageResizeFocus =
  /** Focus the resizing on the bottom. */
  | 'BOTTOM'
  /** Focus the resizing on the bottom left. */
  | 'BOTTOM_LEFT'
  /** Focus the resizing on the bottom right. */
  | 'BOTTOM_RIGHT'
  /** Focus the resizing on the center. */
  | 'CENTER'
  /** Focus the resizing on the largest face. */
  | 'FACE'
  /** Focus the resizing on the area containing all the faces. */
  | 'FACES'
  /** Focus the resizing on the left. */
  | 'LEFT'
  /** Focus the resizing on the right. */
  | 'RIGHT'
  /** Focus the resizing on the top. */
  | 'TOP'
  /** Focus the resizing on the top left. */
  | 'TOP_LEFT'
  /** Focus the resizing on the top right. */
  | 'TOP_RIGHT';

export type ImageResizeStrategy =
  /** Crops a part of the original image to fit into the specified dimensions. */
  | 'CROP'
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  | 'FILL'
  /** Resizes the image to fit into the specified dimensions. */
  | 'FIT'
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  | 'PAD'
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  | 'SCALE'
  /** Creates a thumbnail from the image. */
  | 'THUMB';

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width: InputMaybe<Scalars['Dimension']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/portfolio) */
export type Portfolio = Entry &
  _Node & {
    __typename?: 'Portfolio';
    _id: Scalars['ID']['output'];
    aboutMe: Maybe<PortfolioAboutMe>;
    contentfulMetadata: ContentfulMetadata;
    githubUrl: Maybe<Scalars['String']['output']>;
    headline: Maybe<Scalars['String']['output']>;
    linkedFrom: Maybe<PortfolioLinkingCollections>;
    projectsCollection: Maybe<PortfolioProjectsCollection>;
    sys: Sys;
  };

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/portfolio) */
export type PortfolioAboutMeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/portfolio) */
export type PortfolioGithubUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/portfolio) */
export type PortfolioHeadlineArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/portfolio) */
export type PortfolioLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/portfolio) */
export type PortfolioProjectsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<PortfolioProjectsCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ProjectFilter>;
};

export type PortfolioAboutMe = {
  __typename?: 'PortfolioAboutMe';
  json: Scalars['JSON']['output'];
  links: PortfolioAboutMeLinks;
};

export type PortfolioAboutMeAssets = {
  __typename?: 'PortfolioAboutMeAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type PortfolioAboutMeEntries = {
  __typename?: 'PortfolioAboutMeEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type PortfolioAboutMeLinks = {
  __typename?: 'PortfolioAboutMeLinks';
  assets: PortfolioAboutMeAssets;
  entries: PortfolioAboutMeEntries;
  resources: PortfolioAboutMeResources;
};

export type PortfolioAboutMeResources = {
  __typename?: 'PortfolioAboutMeResources';
  block: Array<PortfolioAboutMeResourcesBlock>;
  hyperlink: Array<PortfolioAboutMeResourcesHyperlink>;
  inline: Array<PortfolioAboutMeResourcesInline>;
};

export type PortfolioAboutMeResourcesBlock = ResourceLink & {
  __typename?: 'PortfolioAboutMeResourcesBlock';
  sys: ResourceSys;
};

export type PortfolioAboutMeResourcesHyperlink = ResourceLink & {
  __typename?: 'PortfolioAboutMeResourcesHyperlink';
  sys: ResourceSys;
};

export type PortfolioAboutMeResourcesInline = ResourceLink & {
  __typename?: 'PortfolioAboutMeResourcesInline';
  sys: ResourceSys;
};

export type PortfolioCollection = {
  __typename?: 'PortfolioCollection';
  items: Array<Maybe<Portfolio>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PortfolioFilter = {
  AND: InputMaybe<Array<InputMaybe<PortfolioFilter>>>;
  OR: InputMaybe<Array<InputMaybe<PortfolioFilter>>>;
  aboutMe_contains: InputMaybe<Scalars['String']['input']>;
  aboutMe_exists: InputMaybe<Scalars['Boolean']['input']>;
  aboutMe_not_contains: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  githubUrl: InputMaybe<Scalars['String']['input']>;
  githubUrl_contains: InputMaybe<Scalars['String']['input']>;
  githubUrl_exists: InputMaybe<Scalars['Boolean']['input']>;
  githubUrl_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  githubUrl_not: InputMaybe<Scalars['String']['input']>;
  githubUrl_not_contains: InputMaybe<Scalars['String']['input']>;
  githubUrl_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  headline: InputMaybe<Scalars['String']['input']>;
  headline_contains: InputMaybe<Scalars['String']['input']>;
  headline_exists: InputMaybe<Scalars['Boolean']['input']>;
  headline_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  headline_not: InputMaybe<Scalars['String']['input']>;
  headline_not_contains: InputMaybe<Scalars['String']['input']>;
  headline_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  projects: InputMaybe<CfProjectNestedFilter>;
  projectsCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
};

export type PortfolioLinkingCollections = {
  __typename?: 'PortfolioLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};

export type PortfolioLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type PortfolioOrder =
  | 'githubUrl_ASC'
  | 'githubUrl_DESC'
  | 'headline_ASC'
  | 'headline_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

export type PortfolioProjectsCollection = {
  __typename?: 'PortfolioProjectsCollection';
  items: Array<Maybe<Project>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PortfolioProjectsCollectionOrder =
  | 'duration_ASC'
  | 'duration_DESC'
  | 'externalUrl_ASC'
  | 'externalUrl_DESC'
  | 'isPasswordProtected_ASC'
  | 'isPasswordProtected_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'slug_ASC'
  | 'slug_DESC'
  | 'subtitle_ASC'
  | 'subtitle_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'year_ASC'
  | 'year_DESC';

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type Project = Entry &
  _Node & {
    __typename?: 'Project';
    _id: Scalars['ID']['output'];
    contentfulMetadata: ContentfulMetadata;
    duration: Maybe<Scalars['String']['output']>;
    externalUrl: Maybe<Scalars['String']['output']>;
    fullDescription: Maybe<ProjectFullDescription>;
    isPasswordProtected: Maybe<Scalars['Boolean']['output']>;
    linkedFrom: Maybe<ProjectLinkingCollections>;
    mainImage: Maybe<Asset>;
    role: Maybe<Scalars['String']['output']>;
    shortDescription: Maybe<Scalars['String']['output']>;
    slug: Maybe<Scalars['String']['output']>;
    subtitle: Maybe<Scalars['String']['output']>;
    sys: Sys;
    title: Maybe<Scalars['String']['output']>;
    tools: Maybe<Array<Maybe<Scalars['String']['output']>>>;
    year: Maybe<Scalars['String']['output']>;
  };

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectDurationArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectExternalUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectFullDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectIsPasswordProtectedArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectMainImageArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectRoleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectShortDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectSlugArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectSubtitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectToolsArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/iisowww2sx04/content_types/project) */
export type ProjectYearArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectCollection = {
  __typename?: 'ProjectCollection';
  items: Array<Maybe<Project>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectFilter = {
  AND: InputMaybe<Array<InputMaybe<ProjectFilter>>>;
  OR: InputMaybe<Array<InputMaybe<ProjectFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  duration: InputMaybe<Scalars['String']['input']>;
  duration_contains: InputMaybe<Scalars['String']['input']>;
  duration_exists: InputMaybe<Scalars['Boolean']['input']>;
  duration_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  duration_not: InputMaybe<Scalars['String']['input']>;
  duration_not_contains: InputMaybe<Scalars['String']['input']>;
  duration_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalUrl: InputMaybe<Scalars['String']['input']>;
  externalUrl_contains: InputMaybe<Scalars['String']['input']>;
  externalUrl_exists: InputMaybe<Scalars['Boolean']['input']>;
  externalUrl_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalUrl_not: InputMaybe<Scalars['String']['input']>;
  externalUrl_not_contains: InputMaybe<Scalars['String']['input']>;
  externalUrl_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fullDescription_contains: InputMaybe<Scalars['String']['input']>;
  fullDescription_exists: InputMaybe<Scalars['Boolean']['input']>;
  fullDescription_not_contains: InputMaybe<Scalars['String']['input']>;
  isPasswordProtected: InputMaybe<Scalars['Boolean']['input']>;
  isPasswordProtected_exists: InputMaybe<Scalars['Boolean']['input']>;
  isPasswordProtected_not: InputMaybe<Scalars['Boolean']['input']>;
  mainImage_exists: InputMaybe<Scalars['Boolean']['input']>;
  role: InputMaybe<Scalars['String']['input']>;
  role_contains: InputMaybe<Scalars['String']['input']>;
  role_exists: InputMaybe<Scalars['Boolean']['input']>;
  role_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role_not: InputMaybe<Scalars['String']['input']>;
  role_not_contains: InputMaybe<Scalars['String']['input']>;
  role_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shortDescription: InputMaybe<Scalars['String']['input']>;
  shortDescription_contains: InputMaybe<Scalars['String']['input']>;
  shortDescription_exists: InputMaybe<Scalars['Boolean']['input']>;
  shortDescription_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shortDescription_not: InputMaybe<Scalars['String']['input']>;
  shortDescription_not_contains: InputMaybe<Scalars['String']['input']>;
  shortDescription_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug: InputMaybe<Scalars['String']['input']>;
  slug_contains: InputMaybe<Scalars['String']['input']>;
  slug_exists: InputMaybe<Scalars['Boolean']['input']>;
  slug_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not: InputMaybe<Scalars['String']['input']>;
  slug_not_contains: InputMaybe<Scalars['String']['input']>;
  slug_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle: InputMaybe<Scalars['String']['input']>;
  subtitle_contains: InputMaybe<Scalars['String']['input']>;
  subtitle_exists: InputMaybe<Scalars['Boolean']['input']>;
  subtitle_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle_not: InputMaybe<Scalars['String']['input']>;
  subtitle_not_contains: InputMaybe<Scalars['String']['input']>;
  subtitle_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_exists: InputMaybe<Scalars['Boolean']['input']>;
  year: InputMaybe<Scalars['String']['input']>;
  year_contains: InputMaybe<Scalars['String']['input']>;
  year_exists: InputMaybe<Scalars['Boolean']['input']>;
  year_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  year_not: InputMaybe<Scalars['String']['input']>;
  year_not_contains: InputMaybe<Scalars['String']['input']>;
  year_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProjectFullDescription = {
  __typename?: 'ProjectFullDescription';
  json: Scalars['JSON']['output'];
  links: ProjectFullDescriptionLinks;
};

export type ProjectFullDescriptionAssets = {
  __typename?: 'ProjectFullDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ProjectFullDescriptionEntries = {
  __typename?: 'ProjectFullDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ProjectFullDescriptionLinks = {
  __typename?: 'ProjectFullDescriptionLinks';
  assets: ProjectFullDescriptionAssets;
  entries: ProjectFullDescriptionEntries;
  resources: ProjectFullDescriptionResources;
};

export type ProjectFullDescriptionResources = {
  __typename?: 'ProjectFullDescriptionResources';
  block: Array<ProjectFullDescriptionResourcesBlock>;
  hyperlink: Array<ProjectFullDescriptionResourcesHyperlink>;
  inline: Array<ProjectFullDescriptionResourcesInline>;
};

export type ProjectFullDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'ProjectFullDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type ProjectFullDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'ProjectFullDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type ProjectFullDescriptionResourcesInline = ResourceLink & {
  __typename?: 'ProjectFullDescriptionResourcesInline';
  sys: ResourceSys;
};

export type ProjectLinkingCollections = {
  __typename?: 'ProjectLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  portfolioCollection: Maybe<PortfolioCollection>;
};

export type ProjectLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectLinkingCollectionsPortfolioCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ProjectLinkingCollectionsPortfolioCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectLinkingCollectionsPortfolioCollectionOrder =
  | 'githubUrl_ASC'
  | 'githubUrl_DESC'
  | 'headline_ASC'
  | 'headline_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

export type ProjectOrder =
  | 'duration_ASC'
  | 'duration_DESC'
  | 'externalUrl_ASC'
  | 'externalUrl_DESC'
  | 'isPasswordProtected_ASC'
  | 'isPasswordProtected_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'slug_ASC'
  | 'slug_DESC'
  | 'subtitle_ASC'
  | 'subtitle_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'year_ASC'
  | 'year_DESC';

export type Query = {
  __typename?: 'Query';
  _node: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  asset: Maybe<Asset>;
  assetCollection: Maybe<AssetCollection>;
  entryCollection: Maybe<EntryCollection>;
  portfolio: Maybe<Portfolio>;
  portfolioCollection: Maybe<PortfolioCollection>;
  project: Maybe<Project>;
  projectCollection: Maybe<ProjectCollection>;
};

export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query_NodesArgs = {
  ids: Array<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<AssetFilter>;
};

export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<EntryFilter>;
};

export type QueryPortfolioArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryPortfolioCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<PortfolioOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<PortfolioFilter>;
};

export type QueryProjectArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryProjectCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ProjectOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ProjectFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale: Maybe<Scalars['String']['output']>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  publishedVersion: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id: InputMaybe<Scalars['String']['input']>;
  id_contains: InputMaybe<Scalars['String']['input']>;
  id_exists: InputMaybe<Scalars['Boolean']['input']>;
  id_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not: InputMaybe<Scalars['String']['input']>;
  id_not_contains: InputMaybe<Scalars['String']['input']>;
  id_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept';
  id: Maybe<Scalars['String']['output']>;
};

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  release_lte: InputMaybe<Scalars['String']['input']>;
  /** Preview content starting from a given timestamp */
  timestamp_lte: InputMaybe<Scalars['DateTime']['input']>;
};

export type _Node = {
  _id: Scalars['ID']['output'];
};

export type CfProjectNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfProjectNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfProjectNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  duration: InputMaybe<Scalars['String']['input']>;
  duration_contains: InputMaybe<Scalars['String']['input']>;
  duration_exists: InputMaybe<Scalars['Boolean']['input']>;
  duration_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  duration_not: InputMaybe<Scalars['String']['input']>;
  duration_not_contains: InputMaybe<Scalars['String']['input']>;
  duration_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalUrl: InputMaybe<Scalars['String']['input']>;
  externalUrl_contains: InputMaybe<Scalars['String']['input']>;
  externalUrl_exists: InputMaybe<Scalars['Boolean']['input']>;
  externalUrl_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalUrl_not: InputMaybe<Scalars['String']['input']>;
  externalUrl_not_contains: InputMaybe<Scalars['String']['input']>;
  externalUrl_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fullDescription_contains: InputMaybe<Scalars['String']['input']>;
  fullDescription_exists: InputMaybe<Scalars['Boolean']['input']>;
  fullDescription_not_contains: InputMaybe<Scalars['String']['input']>;
  isPasswordProtected: InputMaybe<Scalars['Boolean']['input']>;
  isPasswordProtected_exists: InputMaybe<Scalars['Boolean']['input']>;
  isPasswordProtected_not: InputMaybe<Scalars['Boolean']['input']>;
  mainImage_exists: InputMaybe<Scalars['Boolean']['input']>;
  role: InputMaybe<Scalars['String']['input']>;
  role_contains: InputMaybe<Scalars['String']['input']>;
  role_exists: InputMaybe<Scalars['Boolean']['input']>;
  role_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role_not: InputMaybe<Scalars['String']['input']>;
  role_not_contains: InputMaybe<Scalars['String']['input']>;
  role_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shortDescription: InputMaybe<Scalars['String']['input']>;
  shortDescription_contains: InputMaybe<Scalars['String']['input']>;
  shortDescription_exists: InputMaybe<Scalars['Boolean']['input']>;
  shortDescription_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shortDescription_not: InputMaybe<Scalars['String']['input']>;
  shortDescription_not_contains: InputMaybe<Scalars['String']['input']>;
  shortDescription_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug: InputMaybe<Scalars['String']['input']>;
  slug_contains: InputMaybe<Scalars['String']['input']>;
  slug_exists: InputMaybe<Scalars['Boolean']['input']>;
  slug_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not: InputMaybe<Scalars['String']['input']>;
  slug_not_contains: InputMaybe<Scalars['String']['input']>;
  slug_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle: InputMaybe<Scalars['String']['input']>;
  subtitle_contains: InputMaybe<Scalars['String']['input']>;
  subtitle_exists: InputMaybe<Scalars['Boolean']['input']>;
  subtitle_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle_not: InputMaybe<Scalars['String']['input']>;
  subtitle_not_contains: InputMaybe<Scalars['String']['input']>;
  subtitle_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tools_exists: InputMaybe<Scalars['Boolean']['input']>;
  year: InputMaybe<Scalars['String']['input']>;
  year_contains: InputMaybe<Scalars['String']['input']>;
  year_exists: InputMaybe<Scalars['Boolean']['input']>;
  year_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  year_not: InputMaybe<Scalars['String']['input']>;
  year_not_contains: InputMaybe<Scalars['String']['input']>;
  year_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AssetFieldsFragment = {
  __typename?: 'Asset';
  title: string | null;
  description: string | null;
  url: string | null;
  width: number | null;
  height: number | null;
  sys: { __typename?: 'Sys'; id: string };
};

export type ProjectFieldsFragment = {
  __typename?: 'Project';
  title: string | null;
  slug: string | null;
  subtitle: string | null;
  shortDescription: string | null;
  role: string | null;
  duration: string | null;
  year: string | null;
  tools: Array<string | null> | null;
  isPasswordProtected: boolean | null;
  externalUrl: string | null;
  sys: { __typename?: 'Sys'; id: string };
  mainImage: {
    __typename?: 'Asset';
    title: string | null;
    description: string | null;
    url: string | null;
    width: number | null;
    height: number | null;
    sys: { __typename?: 'Sys'; id: string };
  } | null;
};

export type AboutMeFieldsFragment = {
  __typename?: 'PortfolioAboutMe';
  json: any;
  links: {
    __typename?: 'PortfolioAboutMeLinks';
    assets: {
      __typename?: 'PortfolioAboutMeAssets';
      block: Array<{
        __typename?: 'Asset';
        url: string | null;
        title: string | null;
        width: number | null;
        height: number | null;
        description: string | null;
        sys: { __typename?: 'Sys'; id: string };
      } | null>;
    };
  };
};

export type PortfolioFieldsFragment = {
  __typename?: 'Portfolio';
  _id: string;
  headline: string | null;
  githubUrl: string | null;
  sys: { __typename?: 'Sys'; id: string };
  aboutMe: {
    __typename?: 'PortfolioAboutMe';
    json: any;
    links: {
      __typename?: 'PortfolioAboutMeLinks';
      assets: {
        __typename?: 'PortfolioAboutMeAssets';
        block: Array<{
          __typename?: 'Asset';
          url: string | null;
          title: string | null;
          width: number | null;
          height: number | null;
          description: string | null;
          sys: { __typename?: 'Sys'; id: string };
        } | null>;
      };
    };
  } | null;
  projectsCollection: {
    __typename?: 'PortfolioProjectsCollection';
    items: Array<{
      __typename?: 'Project';
      title: string | null;
      slug: string | null;
      subtitle: string | null;
      shortDescription: string | null;
      role: string | null;
      duration: string | null;
      year: string | null;
      tools: Array<string | null> | null;
      isPasswordProtected: boolean | null;
      externalUrl: string | null;
      sys: { __typename?: 'Sys'; id: string };
      mainImage: {
        __typename?: 'Asset';
        title: string | null;
        description: string | null;
        url: string | null;
        width: number | null;
        height: number | null;
        sys: { __typename?: 'Sys'; id: string };
      } | null;
    } | null>;
  } | null;
};

export type GetPortfolioQueryVariables = Exact<{ [key: string]: never }>;

export type GetPortfolioQuery = {
  __typename?: 'Query';
  portfolioCollection: {
    __typename?: 'PortfolioCollection';
    items: Array<{
      __typename?: 'Portfolio';
      _id: string;
      headline: string | null;
      githubUrl: string | null;
      sys: { __typename?: 'Sys'; id: string };
      aboutMe: {
        __typename?: 'PortfolioAboutMe';
        json: any;
        links: {
          __typename?: 'PortfolioAboutMeLinks';
          assets: {
            __typename?: 'PortfolioAboutMeAssets';
            block: Array<{
              __typename?: 'Asset';
              url: string | null;
              title: string | null;
              width: number | null;
              height: number | null;
              description: string | null;
              sys: { __typename?: 'Sys'; id: string };
            } | null>;
          };
        };
      } | null;
      projectsCollection: {
        __typename?: 'PortfolioProjectsCollection';
        items: Array<{
          __typename?: 'Project';
          title: string | null;
          slug: string | null;
          subtitle: string | null;
          shortDescription: string | null;
          role: string | null;
          duration: string | null;
          year: string | null;
          tools: Array<string | null> | null;
          isPasswordProtected: boolean | null;
          externalUrl: string | null;
          sys: { __typename?: 'Sys'; id: string };
          mainImage: {
            __typename?: 'Asset';
            title: string | null;
            description: string | null;
            url: string | null;
            width: number | null;
            height: number | null;
            sys: { __typename?: 'Sys'; id: string };
          } | null;
        } | null>;
      } | null;
    } | null>;
  } | null;
};

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProjectsQuery = {
  __typename?: 'Query';
  projectCollection: {
    __typename?: 'ProjectCollection';
    items: Array<{
      __typename?: 'Project';
      title: string | null;
      slug: string | null;
      subtitle: string | null;
      shortDescription: string | null;
      role: string | null;
      duration: string | null;
      year: string | null;
      tools: Array<string | null> | null;
      isPasswordProtected: boolean | null;
      externalUrl: string | null;
      sys: { __typename?: 'Sys'; id: string };
      mainImage: {
        __typename?: 'Asset';
        title: string | null;
        description: string | null;
        url: string | null;
        width: number | null;
        height: number | null;
        sys: { __typename?: 'Sys'; id: string };
      } | null;
    } | null>;
  } | null;
};

export type GetProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type GetProjectBySlugQuery = {
  __typename?: 'Query';
  projectCollection: {
    __typename?: 'ProjectCollection';
    items: Array<{
      __typename?: 'Project';
      title: string | null;
      slug: string | null;
      subtitle: string | null;
      shortDescription: string | null;
      role: string | null;
      duration: string | null;
      year: string | null;
      tools: Array<string | null> | null;
      isPasswordProtected: boolean | null;
      externalUrl: string | null;
      fullDescription: {
        __typename?: 'ProjectFullDescription';
        json: any;
        links: {
          __typename?: 'ProjectFullDescriptionLinks';
          assets: {
            __typename?: 'ProjectFullDescriptionAssets';
            block: Array<{
              __typename?: 'Asset';
              url: string | null;
              title: string | null;
              width: number | null;
              height: number | null;
              description: string | null;
              sys: { __typename?: 'Sys'; id: string };
            } | null>;
          };
        };
      } | null;
      sys: { __typename?: 'Sys'; id: string };
      mainImage: {
        __typename?: 'Asset';
        title: string | null;
        description: string | null;
        url: string | null;
        width: number | null;
        height: number | null;
        sys: { __typename?: 'Sys'; id: string };
      } | null;
    } | null>;
  } | null;
};

export type GetProjectSlugsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProjectSlugsQuery = {
  __typename?: 'Query';
  projectCollection: {
    __typename?: 'ProjectCollection';
    items: Array<{ __typename?: 'Project'; slug: string | null } | null>;
  } | null;
};

export type GetPortfolioWithProjectDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPortfolioWithProjectDetailsQuery = {
  __typename?: 'Query';
  portfolioCollection: {
    __typename?: 'PortfolioCollection';
    items: Array<{
      __typename?: 'Portfolio';
      _id: string;
      headline: string | null;
      githubUrl: string | null;
      sys: { __typename?: 'Sys'; id: string };
      aboutMe: {
        __typename?: 'PortfolioAboutMe';
        json: any;
        links: {
          __typename?: 'PortfolioAboutMeLinks';
          assets: {
            __typename?: 'PortfolioAboutMeAssets';
            block: Array<{
              __typename?: 'Asset';
              url: string | null;
              title: string | null;
              width: number | null;
              height: number | null;
              description: string | null;
              sys: { __typename?: 'Sys'; id: string };
            } | null>;
          };
        };
      } | null;
      projectsCollection: {
        __typename?: 'PortfolioProjectsCollection';
        items: Array<{
          __typename?: 'Project';
          title: string | null;
          slug: string | null;
          subtitle: string | null;
          shortDescription: string | null;
          role: string | null;
          duration: string | null;
          year: string | null;
          tools: Array<string | null> | null;
          isPasswordProtected: boolean | null;
          externalUrl: string | null;
          fullDescription: {
            __typename?: 'ProjectFullDescription';
            json: any;
            links: {
              __typename?: 'ProjectFullDescriptionLinks';
              assets: {
                __typename?: 'ProjectFullDescriptionAssets';
                block: Array<{
                  __typename?: 'Asset';
                  url: string | null;
                  title: string | null;
                  width: number | null;
                  height: number | null;
                  description: string | null;
                  sys: { __typename?: 'Sys'; id: string };
                } | null>;
              };
            };
          } | null;
          sys: { __typename?: 'Sys'; id: string };
          mainImage: {
            __typename?: 'Asset';
            title: string | null;
            description: string | null;
            url: string | null;
            width: number | null;
            height: number | null;
            sys: { __typename?: 'Sys'; id: string };
          } | null;
        } | null>;
      } | null;
    } | null>;
  } | null;
};

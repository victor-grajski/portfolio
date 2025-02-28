/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment AssetFields on Asset {\n  sys {\n    id\n  }\n  title\n  description\n  url\n  width\n  height\n}\n\nfragment ProjectFields on Project {\n  sys {\n    id\n  }\n  title\n  slug\n  subtitle\n  shortDescription\n  mainImage {\n    ...AssetFields\n  }\n  role\n  duration\n  year\n  tools\n  isPasswordProtected\n  externalUrl\n}": typeof types.AssetFieldsFragmentDoc,
    "query GetAllProjects {\n  projectCollection {\n    items {\n      ...ProjectFields\n    }\n  }\n}\n\nquery GetProjectBySlug($slug: String!) {\n  projectCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...ProjectFields\n      fullDescription {\n        json\n        links {\n          assets {\n            block {\n              sys {\n                id\n              }\n              url\n              title\n              width\n              height\n              description\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nquery GetProjectSlugs {\n  projectCollection {\n    items {\n      slug\n    }\n  }\n}": typeof types.GetAllProjectsDocument,
};
const documents: Documents = {
    "fragment AssetFields on Asset {\n  sys {\n    id\n  }\n  title\n  description\n  url\n  width\n  height\n}\n\nfragment ProjectFields on Project {\n  sys {\n    id\n  }\n  title\n  slug\n  subtitle\n  shortDescription\n  mainImage {\n    ...AssetFields\n  }\n  role\n  duration\n  year\n  tools\n  isPasswordProtected\n  externalUrl\n}": types.AssetFieldsFragmentDoc,
    "query GetAllProjects {\n  projectCollection {\n    items {\n      ...ProjectFields\n    }\n  }\n}\n\nquery GetProjectBySlug($slug: String!) {\n  projectCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...ProjectFields\n      fullDescription {\n        json\n        links {\n          assets {\n            block {\n              sys {\n                id\n              }\n              url\n              title\n              width\n              height\n              description\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nquery GetProjectSlugs {\n  projectCollection {\n    items {\n      slug\n    }\n  }\n}": types.GetAllProjectsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AssetFields on Asset {\n  sys {\n    id\n  }\n  title\n  description\n  url\n  width\n  height\n}\n\nfragment ProjectFields on Project {\n  sys {\n    id\n  }\n  title\n  slug\n  subtitle\n  shortDescription\n  mainImage {\n    ...AssetFields\n  }\n  role\n  duration\n  year\n  tools\n  isPasswordProtected\n  externalUrl\n}"): (typeof documents)["fragment AssetFields on Asset {\n  sys {\n    id\n  }\n  title\n  description\n  url\n  width\n  height\n}\n\nfragment ProjectFields on Project {\n  sys {\n    id\n  }\n  title\n  slug\n  subtitle\n  shortDescription\n  mainImage {\n    ...AssetFields\n  }\n  role\n  duration\n  year\n  tools\n  isPasswordProtected\n  externalUrl\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllProjects {\n  projectCollection {\n    items {\n      ...ProjectFields\n    }\n  }\n}\n\nquery GetProjectBySlug($slug: String!) {\n  projectCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...ProjectFields\n      fullDescription {\n        json\n        links {\n          assets {\n            block {\n              sys {\n                id\n              }\n              url\n              title\n              width\n              height\n              description\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nquery GetProjectSlugs {\n  projectCollection {\n    items {\n      slug\n    }\n  }\n}"): (typeof documents)["query GetAllProjects {\n  projectCollection {\n    items {\n      ...ProjectFields\n    }\n  }\n}\n\nquery GetProjectBySlug($slug: String!) {\n  projectCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...ProjectFields\n      fullDescription {\n        json\n        links {\n          assets {\n            block {\n              sys {\n                id\n              }\n              url\n              title\n              width\n              height\n              description\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nquery GetProjectSlugs {\n  projectCollection {\n    items {\n      slug\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
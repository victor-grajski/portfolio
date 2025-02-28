import { GraphQLClient } from 'graphql-request';

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

export const graphqlClient = new GraphQLClient(CONTENTFUL_URL, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

// Preview client for draft content
export const previewClient = new GraphQLClient(CONTENTFUL_URL, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
}); 
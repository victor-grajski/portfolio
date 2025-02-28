import { graphqlClient, previewClient } from './client';

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>,
  preview = false
): Promise<T> {
  const client = preview ? previewClient : graphqlClient;
  
  try {
    return await client.request<T>(query, variables);
  } catch (error) {
    console.error('[Contentful GraphQL Error]:', error);
    throw error;
  }
}

export async function getProjects(preview = false) {
  const data = await fetchGraphQL(
    /* GraphQL */
    `query GetAllProjects {
      projectCollection {
        items {
          sys { id }
          title
          slug
          subtitle
          shortDescription
          mainImage {
            url
            width
            height
          }
          isPasswordProtected
        }
      }
    }`,
    undefined,
    preview
  );

  return data.projectCollection.items;
}

export async function getProjectBySlug(slug: string, preview = false) {
  const data = await fetchGraphQL(
    /* GraphQL */
    `query GetProjectBySlug($slug: String!) {
      projectCollection(where: { slug: $slug }, limit: 1) {
        items {
          sys { id }
          title
          slug
          subtitle
          shortDescription
          fullDescription {
            json
            links {
              assets {
                block {
                  sys { id }
                  url
                  title
                  width
                  height
                }
              }
            }
          }
          mainImage {
            url
            width
            height
          }
          role
          duration
          year
          tools
          isPasswordProtected
          externalUrl
        }
      }
    }`,
    { slug },
    preview
  );

  return data.projectCollection.items[0];
} 
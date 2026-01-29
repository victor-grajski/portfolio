import { graphqlClient, previewClient } from './client';
import { ProjectData } from '@/types/contentful';
import { GetPortfolioQuery } from './generated/graphql';

// Define types for the API responses
interface ProjectCollectionResponse {
  projectCollection: {
    items: Array<{
      sys: { id: string };
      title?: string;
      slug?: string;
      subtitle?: string;
      shortDescription?: string;
      fullDescription?: {
        json: {
          content?: Array<{
            content?: Array<{
              value?: string;
              [key: string]: unknown;
            }>;
            [key: string]: unknown;
          }>;
          [key: string]: unknown;
        };
        links?: {
          assets?: {
            block?: Array<{
              sys: { id: string };
              url?: string;
              title?: string;
              width?: number;
              height?: number;
            }>;
          };
        };
      };
      mainImage?: {
        url?: string;
        width?: number;
        height?: number;
      };
      demoVideo?: {
        url?: string;
        width?: number;
        height?: number;
      };
      role?: string;
      duration?: string;
      year?: string;
      tools?: string[];
      isPasswordProtected?: boolean;
    }>;
  };
}

export async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
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

export async function getProjects(preview = false): Promise<ProjectData[]> {
  // Fetch projects from Portfolio to maintain consistent ordering
  const portfolio = await getPortfolio(preview);

  if (!portfolio?.projectsCollection?.items) {
    return [];
  }

  // Filter out projects without a slug and map to ProjectData format
  return portfolio.projectsCollection.items
    .filter((item) => item.slug)
    .map((item) => ({
      sys: { id: item.sys.id },
      title: item.title ?? undefined,
      slug: item.slug as string,
      subtitle: item.subtitle ?? undefined,
      shortDescription: item.shortDescription ?? undefined,
      mainImage: item.mainImage?.url
        ? {
            url: item.mainImage.url,
            width: item.mainImage.width ?? undefined,
            height: item.mainImage.height ?? undefined,
          }
        : undefined,
      demoVideo: item.demoVideo?.url
        ? {
            url: item.demoVideo.url,
            width: item.demoVideo.width ?? undefined,
            height: item.demoVideo.height ?? undefined,
          }
        : undefined,
      role: item.role ?? undefined,
      duration: item.duration ?? undefined,
      year: item.year ?? undefined,
      tools: item.tools?.filter((tool): tool is string => tool !== null) ?? undefined,
      isPasswordProtected: item.isPasswordProtected ?? undefined,
    }));
}

export async function getProjectBySlug(slug: string, preview = false): Promise<ProjectData | null> {
  const data = await fetchGraphQL<ProjectCollectionResponse>(
    /* GraphQL */
    `
      query GetProjectBySlug($slug: String!) {
        projectCollection(where: { slug: $slug }, limit: 1) {
          items {
            sys {
              id
            }
            title
            slug
            subtitle
            shortDescription
            fullDescription {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
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
            demoVideo {
              url
              width
              height
            }
            role
            duration
            year
            tools
            isPasswordProtected
          }
        }
      }
    `,
    { slug },
    preview
  );

  const project = data.projectCollection.items[0];

  if (!project || !project.slug) {
    return null;
  }

  return {
    ...project,
    slug: project.slug,
  };
}

export async function getPortfolio(preview = false) {
  const data = await fetchGraphQL<GetPortfolioQuery>(
    /* GraphQL */
    `
      query GetPortfolio {
        portfolioCollection(limit: 1) {
          items {
            sys {
              id
            }
            _id
            headline
            githubUrl
            aboutMe {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    title
                    width
                    height
                    description
                  }
                }
              }
            }
            projectsCollection(limit: 100) {
              items {
                sys {
                  id
                }
                title
                slug
                subtitle
                shortDescription
                mainImage {
                  sys {
                    id
                  }
                  title
                  description
                  url
                  width
                  height
                }
                demoVideo {
                  url
                  width
                  height
                }
                role
                duration
                year
                tools
                isPasswordProtected
              }
            }
          }
        }
      }
    `,
    undefined,
    preview
  );

  return data.portfolioCollection.items[0] || null;
}

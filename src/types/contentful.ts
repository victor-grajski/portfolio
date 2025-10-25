// Custom types for Contentful data that match the structure from our API

export type ProjectData = {
  sys: { id: string };
  title?: string;
  slug: string;
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
  role?: string;
  duration?: string;
  year?: string;
  tools?: string[];
  isPasswordProtected?: boolean;
  externalUrl?: string;
};

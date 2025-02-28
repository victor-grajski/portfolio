declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    CONTENTFUL_SPACE_ID: string;
    CONTENTFUL_ACCESS_TOKEN: string;
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
  }
} 
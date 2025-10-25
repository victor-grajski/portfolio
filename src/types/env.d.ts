declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    CONTENTFUL_SPACE_ID: string;
    CONTENTFUL_ACCESS_TOKEN: string;
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
    PROJECT_PASSWORD: string;
    NEXT_PUBLIC_DEV_SKIP_AUTH?: string;
  }
}

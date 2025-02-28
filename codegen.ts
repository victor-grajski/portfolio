import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  schema: [{
    [`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`]: {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    },
  }],
  documents: ['src/**/*.graphql'],
  generates: {
    'src/lib/contentful/generated/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations'],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
        dedupeFragments: true,
      },
    },
  },
};

export default config; 
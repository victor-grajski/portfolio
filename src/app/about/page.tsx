import React from 'react';
import Image from 'next/image';
import { getPortfolio } from '@/lib/contentful/api';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';

export const metadata = {
  title: 'About | Victor Grajski',
  description: 'Learn more about Victor Grajski - background, skills, and experience.',
  robots: {
    index: false,
    follow: false,
  },
};

interface ContentfulAsset {
  sys: { id: string };
  url: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

// Create rich text options with asset rendering support
function getRichTextOptions(assetMap: Map<string, ContentfulAsset>): Options {
  return {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-gray-800 px-2 py-1 rounded text-sm">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => (
        <p className="mb-4 leading-relaxed text-[#454545]">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_node, children) => (
        <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node, children) => (
        <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node, children) => (
        <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (_node, children) => (
        <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node, children) => (
        <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node, children) => <li className="mb-2">{children}</li>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node.data.target.sys.id;
        const asset = assetMap.get(assetId);

        if (!asset?.url) return null;

        return (
          <div className="my-6">
            <Image
              src={asset.url}
              alt={asset.description || asset.title || 'Embedded image'}
              width={asset.width || 800}
              height={asset.height || 600}
              className="rounded-lg w-full h-auto"
            />
            {asset.description && (
              <p className="text-sm text-gray-600 mt-2 text-center italic">{asset.description}</p>
            )}
          </div>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          className="text-blue-400 hover:text-blue-300 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };
}

export default async function AboutPage() {
  const portfolio = await getPortfolio();

  // Create asset map from aboutMe links
  const assetMap = new Map<string, ContentfulAsset>();
  if (portfolio?.aboutMe?.links?.assets?.block) {
    portfolio.aboutMe.links.assets.block.forEach((asset) => {
      if (asset?.sys?.id && asset.url) {
        assetMap.set(asset.sys.id, asset as ContentfulAsset);
      }
    });
  }

  const richTextOptions = getRichTextOptions(assetMap);

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-16">
        {/* Left column - Title */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-4xl font-bold mb-4 lg:mb-0">Hi, I&apos;m Victor.</h1>
        </div>

        {/* Right column - Content */}
        <div className="lg:col-span-8">
          <div className="prose prose-lg max-w-none">
            {portfolio?.aboutMe?.json ? (
              documentToReactComponents(
                portfolio.aboutMe.json as unknown as Document,
                richTextOptions
              )
            ) : (
              <p className="mb-4">Content coming soon...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { getPortfolio } from '@/lib/contentful/api';

export const metadata = {
  title: 'About | Victor Grajski',
  description: 'Learn more about Victor Grajski - background, skills, and experience.',
};

// Types for Contentful rich text
interface RichTextMark {
  type: string;
}

interface RichTextTextNode {
  nodeType: string;
  value?: string;
  marks?: RichTextMark[];
  content?: RichTextNode[];
}

interface RichTextNode {
  nodeType: string;
  content?: RichTextNode[];
  value?: string;
}

interface RichTextDocument {
  content?: RichTextNode[];
}

// Helper function to render text nodes with marks (bold, italic, etc.)
function renderTextNode(textNode: RichTextTextNode, nodeIndex: number, textIndex: number) {
  if (textNode.nodeType !== 'text') return '';

  let content: React.ReactNode = textNode.value || '';

  // Apply marks (bold, italic, etc.)
  if (textNode.marks && textNode.marks.length > 0) {
    textNode.marks.forEach((mark: RichTextMark, markIndex: number) => {
      if (mark.type === 'bold') {
        content = <strong key={`bold-${nodeIndex}-${textIndex}-${markIndex}`}>{content}</strong>;
      } else if (mark.type === 'italic') {
        content = <em key={`italic-${nodeIndex}-${textIndex}-${markIndex}`}>{content}</em>;
      }
    });
  }

  return content;
}

// Helper function to render rich text content from Contentful
function renderRichText(json: RichTextDocument) {
  if (!json?.content) return null;

  return json.content.map((node: RichTextNode, index: number) => {
    switch (node.nodeType) {
      case 'paragraph': {
        if (!node.content || node.content.length === 0) return null;

        const content = node.content.map((textNode: RichTextNode, textIndex: number) =>
          renderTextNode(textNode as RichTextTextNode, index, textIndex)
        );

        return (
          <p key={index} className="mb-4">
            {content}
          </p>
        );
      }
      case 'heading-1':
        return (
          <h1 key={index} className="text-3xl font-bold mb-4">
            {node.content?.[0]?.value || ''}
          </h1>
        );
      case 'heading-2':
        return (
          <h2 key={index} className="text-2xl font-bold mb-3">
            {node.content?.[0]?.value || ''}
          </h2>
        );
      case 'heading-3':
        return (
          <h3 key={index} className="text-xl font-bold mb-2">
            {node.content?.[0]?.value || ''}
          </h3>
        );
      case 'unordered-list':
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-1">
            {node.content?.map((listItem: RichTextNode, liIndex: number) => (
              <li key={liIndex}>{listItem.content?.[0]?.content?.[0]?.value || ''}</li>
            ))}
          </ul>
        );
      case 'ordered-list':
        return (
          <ol key={index} className="list-decimal list-inside mb-4 space-y-1">
            {node.content?.map((listItem: RichTextNode, liIndex: number) => (
              <li key={liIndex}>{listItem.content?.[0]?.content?.[0]?.value || ''}</li>
            ))}
          </ol>
        );
      default:
        return null;
    }
  });
}

export default async function AboutPage() {
  const portfolio = await getPortfolio();

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
              renderRichText(portfolio.aboutMe.json)
            ) : (
              <p className="mb-4">Content coming soon...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

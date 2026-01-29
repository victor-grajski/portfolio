import React from 'react';
import { getProjectBySlug, getProjects } from '@/lib/contentful/api';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';

interface Props {
  params: Promise<{ slug: string }>;
}

interface ContentfulAsset {
  sys: { id: string };
  url: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

// Allow dynamic generation of pages not included in generateStaticParams
export const dynamicParams = true;

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

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
        <p className="opacity-80 leading-relaxed mb-4">{children}</p>
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
        <ul className="list-disc list-inside mb-4 opacity-80">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node, children) => (
        <ol className="list-decimal list-inside mb-4 opacity-80">{children}</ol>
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
              <p className="text-sm opacity-60 mt-2 text-center italic">{asset.description}</p>
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

async function getProjectData(slug: string) {
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getProjects()]);

  if (!project) {
    return null;
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const prevProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return { project, prevProject, nextProject };
}

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch projects for static generation:', error);
    // Return empty array to allow build to continue
    // Pages will be generated on-demand at runtime
    return [];
  }
}

// Generate metadata for the project page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  // If the project is password protected, add noindex meta tag
  const robots = project.isPasswordProtected
    ? { index: false, follow: false }
    : { index: true, follow: true };

  return {
    title: `${project.title} | Victor Grajski`,
    description: project.subtitle || `Project by Victor Grajski`,
    robots,
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = await getProjectData(slug);

  if (!data) {
    return <div>Project not found</div>;
  }

  const { project, prevProject, nextProject } = data;

  // Create asset map from fullDescription links
  const assetMap = new Map<string, ContentfulAsset>();
  if (project.fullDescription?.links?.assets?.block) {
    project.fullDescription.links.assets.block.forEach((asset) => {
      if (asset?.sys?.id && asset.url) {
        assetMap.set(asset.sys.id, asset as ContentfulAsset);
      }
    });
  }

  const richTextOptions = getRichTextOptions(assetMap);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{project.title}</h1>
        {project.subtitle && <p className="text-xl md:text-2xl opacity-50">{project.subtitle}</p>}
      </div>

      {/* Main Image */}
      {project.mainImage?.url && (
        <div className="relative w-full aspect-[16/9] mb-12">
          <Image
            src={project.mainImage.url}
            alt={project.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row lg:gap-12">
        {/* Left Column - Project Details */}
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <div className="space-y-6">
            {project.role && (
              <div>
                <h2 className="text-lg font-semibold mb-1 text-[#454545]">Role</h2>
                <p className="opacity-80 text-[#454545]">{project.role}</p>
              </div>
            )}
            {project.duration && (
              <div>
                <h2 className="text-lg font-semibold mb-1 text-[#454545]">Duration</h2>
                <p className="opacity-80 text-[#454545]">{project.duration}</p>
              </div>
            )}
            {project.year && (
              <div>
                <h2 className="text-lg font-semibold mb-1 text-[#454545]">Year</h2>
                <p className="opacity-80 text-[#454545]">{project.year}</p>
              </div>
            )}
            {project.tools && project.tools.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-1 text-[#454545]">Tools</h2>
                <p className="opacity-80 text-[#454545]">{project.tools.join(', ')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Description */}
        <div className="lg:w-2/3">
          {project.fullDescription?.json && (
            <div className="mb-8 prose prose-invert max-w-none text-[#454545]">
              {documentToReactComponents(
                project.fullDescription.json as unknown as Document,
                richTextOptions
              )}
            </div>
          )}
        </div>
      </div>

      {/* Previous/Next Navigation */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="flex items-center text-lg hover:opacity-70 transition-opacity text-[#219897]"
          >
            <span className="mr-2">←</span>
            <span>{prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center text-lg hover:opacity-70 transition-opacity text-[#219897]"
          >
            <span>{nextProject.title}</span>
            <span className="ml-2">→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

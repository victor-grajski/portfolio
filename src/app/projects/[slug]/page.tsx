import { getProjectBySlug, getProjects } from '@/lib/contentful/api';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// Allow dynamic generation of pages not included in generateStaticParams
export const dynamicParams = true;

async function getProjectData(slug: string) {
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getProjects()]);

  if (!project) {
    return null;
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

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

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
        {project.subtitle && <p className="text-xl md:text-2xl opacity-80">{project.subtitle}</p>}
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
                <h2 className="text-lg font-bold mb-1">Role</h2>
                <p className="opacity-80">{project.role}</p>
              </div>
            )}
            {project.duration && (
              <div>
                <h2 className="text-lg font-bold mb-1">Duration</h2>
                <p className="opacity-80">{project.duration}</p>
              </div>
            )}
            {project.year && (
              <div>
                <h2 className="text-lg font-bold mb-1">Year</h2>
                <p className="opacity-80">{project.year}</p>
              </div>
            )}
            {project.tools && project.tools.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-1">Tools</h2>
                <p className="opacity-80">{project.tools.join(', ')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Description and Link */}
        <div className="lg:w-2/3">
          {project.fullDescription?.json && (
            <div className="mb-8">
              <p className="opacity-80 leading-relaxed">
                {project.fullDescription.json.content?.[0]?.content?.[0]?.value || ''}
              </p>
            </div>
          )}

          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              View Project
            </a>
          )}
        </div>
      </div>

      {/* Previous/Next Navigation */}
      <div className="mt-16 pt-8 border-t flex justify-between">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="flex items-center text-lg hover:opacity-70 transition-opacity"
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
            className="flex items-center text-lg hover:opacity-70 transition-opacity"
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

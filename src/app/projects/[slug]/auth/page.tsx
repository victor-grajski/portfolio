import { getProjectBySlug } from '@/lib/contentful/api';
import { ProjectAuthWithUrlPassword } from '@/components/ProjectAuthWithUrlPassword';
import { Metadata } from 'next';

interface ProjectAuthParams {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for the auth page - always noindex
export async function generateMetadata({ params }: ProjectAuthParams): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = await getProjectBySlug(slug);

  return {
    title: project
      ? `${project.title} - Authentication | Victor Grajski`
      : 'Authentication | Victor Grajski',
    description: 'Authentication required to view this project',
    robots: { index: false, follow: false },
  };
}

export default async function ProjectAuthPage({ params }: ProjectAuthParams) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
        {project.subtitle && <p className="text-xl md:text-2xl opacity-80">{project.subtitle}</p>}
      </div>

      {/* Commented out blurred image section
      {project.mainImage?.url && (
        <div className="relative w-full aspect-[16/9] mb-12">
          <div className="absolute inset-0 backdrop-blur-md z-10" />
          <Image
            src={project.mainImage.url}
            alt={project.title}
            fill
            className="object-cover rounded-xl opacity-50"
          />
        </div>
      )}
      */}

      <div className="max-w-lg">
        <ProjectAuthWithUrlPassword projectSlug={slug} />
      </div>
    </div>
  );
}

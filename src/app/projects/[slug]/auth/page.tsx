import { getProjectBySlug } from '@/lib/contentful/api';
import { ProjectAuthForm } from '@/components/ProjectAuthForm';
import Image from 'next/image';

interface ProjectAuthParams {
  params: {
    slug: string;
  };
}

export default async function ProjectAuthPage({ params }: ProjectAuthParams) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
        {project.subtitle && (
          <p className="text-xl md:text-2xl opacity-80">{project.subtitle}</p>
        )}
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
        <ProjectAuthForm projectSlug={params.slug} />
      </div>
    </div>
  );
} 
import { getPortfolio } from '@/lib/contentful/api';
import ProjectCard from '@/components/ProjectCard';
import { ProjectData } from '@/types/contentful';

export async function ProjectsList() {
  // Full query - fetches all projects with images (heavier)
  const portfolio = await getPortfolio();

  // Extract projects from portfolio, filtering out any without slugs and mapping to ProjectData format
  const projects: ProjectData[] =
    portfolio?.projectsCollection?.items
      .filter((project) => project?.slug)
      .map((project) => ({
        sys: { id: project!.sys!.id },
        title: project!.title ?? undefined,
        slug: project!.slug!,
        subtitle: project!.subtitle ?? undefined,
        shortDescription: project!.shortDescription ?? undefined,
        mainImage: project!.mainImage?.url
          ? {
              url: project!.mainImage.url,
              width: project!.mainImage.width ?? undefined,
              height: project!.mainImage.height ?? undefined,
            }
          : undefined,
        role: project!.role ?? undefined,
        duration: project!.duration ?? undefined,
        year: project!.year ?? undefined,
        tools: project!.tools?.filter((tool): tool is string => tool !== null) ?? undefined,
        isPasswordProtected: project!.isPasswordProtected ?? undefined,
      })) || [];

  return (
    <section className="space-y-8">
      {projects.map((project) => (
        <ProjectCard key={project.sys.id} project={project} />
      ))}
    </section>
  );
}

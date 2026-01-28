import { getPortfolio } from '@/lib/contentful/api';
import { HeroText } from '@/components/HeroText';
import ProjectCard from '@/components/ProjectCard';
import { HomepageAuthWithUrlPassword } from '@/components/HomepageAuthWithUrlPassword';
import { ProjectData } from '@/types/contentful';
import { Suspense } from 'react';

export default async function HomePage() {
  // Get portfolio data which includes projects
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
        externalUrl: project!.externalUrl ?? undefined,
      })) || [];

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Silent authentication handler - no UI shown */}
      <Suspense fallback={null}>
        <HomepageAuthWithUrlPassword />
      </Suspense>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="w-full lg:w-2/3">
          <HeroText>{portfolio?.headline}</HeroText>
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-8">
        {projects.map((project) => (
          <ProjectCard key={project.sys.id} project={project} />
        ))}
      </section>
    </div>
  );
}

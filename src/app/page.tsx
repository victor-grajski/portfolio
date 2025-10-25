import { getProjects } from '@/lib/contentful/api';
import { HeroText } from '@/components/HeroText';
import ProjectCard from '@/components/ProjectCard';
import { HomepageAuthWithUrlPassword } from '@/components/HomepageAuthWithUrlPassword';

export default async function HomePage() {
  // Get projects and ensure they all have slugs
  const projects = await getProjects();

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Silent authentication handler - no UI shown */}
      <HomepageAuthWithUrlPassword />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <HeroText>
          As a Design Engineer I use code to rapidly answer product and design questions, helping
          teams build the right thing, saving resources and empowering users.
        </HeroText>
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

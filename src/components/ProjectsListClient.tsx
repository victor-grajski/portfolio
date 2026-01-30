'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { ProjectsListSkeleton } from '@/components/ProjectsListSkeleton';
import { ProjectData } from '@/types/contentful';

export function ProjectsListClient() {
  const [projects, setProjects] = useState<ProjectData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Fetch from an API route that returns projects
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading || projects === null) {
    return <ProjectsListSkeleton />;
  }

  return (
    <section className="space-y-8">
      {projects.map((project) => (
        <ProjectCard key={project.sys.id} project={project} />
      ))}
    </section>
  );
}

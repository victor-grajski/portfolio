'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ProjectData } from '@/types/contentful';

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (project.isPasswordProtected && !session) {
      router.push(`/projects/${project.slug}/auth`);
    } else {
      router.push(`/projects/${project.slug}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-black rounded-2xl p-6 md:p-8 hover:scale-[1.02] cursor-pointer relative"
      style={{
        transition: 'all 0.3s cubic-bezier(0.33, 0, 0.2, 1)',
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
      }}
    >
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Content - Left on desktop, bottom on mobile */}
        <div className="order-2 lg:order-1 lg:w-1/2 mt-6 lg:mt-0 text-[#f8f8f8]">
          <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
          {project.shortDescription && (
            <p className="opacity-80 mb-12 md:mb-16 lg:mb-0">{project.shortDescription}</p>
          )}
        </div>

        {/* Image - Right on desktop, top on mobile */}
        {project.mainImage?.url && (
          <div className="order-1 lg:order-2 lg:w-1/2">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={project.mainImage.url}
                alt={project.title || 'Project image'}
                fill
                className="object-cover group-hover:scale-105"
                style={{ transition: 'transform 0.3s cubic-bezier(0.33, 0, 0.2, 1)' }}
              />
              {/* Commented out darkening overlay
              <div 
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40" 
                style={{ transition: 'opacity 0.3s cubic-bezier(0.33, 0, 0.2, 1)' }}
              />
              */}
            </div>
          </div>
        )}
      </div>

      {/* Password Protected Badge - Bottom Left */}
      {project.isPasswordProtected && (
        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
          <span className="inline-block border border-[#f8f8f8] text-[#f8f8f8] text-sm px-3 py-1 rounded-md bg-transparent">
            Password Protected
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;

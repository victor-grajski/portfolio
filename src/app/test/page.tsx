import { getProjects } from '@/lib/contentful/api';
import { Project } from '@/lib/contentful/generated/graphql';
import Image from 'next/image';

export default async function TestPage() {
  const projects = await getProjects();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Projects Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <div 
            key={project.sys.id} 
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {project.mainImage?.url && (
              <div className="relative w-full h-48">
                <Image
                  src={project.mainImage.url}
                  alt={project.title || 'Project image'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{project.title || 'Untitled Project'}</h2>
              {project.subtitle && (
                <p className="text-gray-600 mb-2">{project.subtitle}</p>
              )}
              {project.shortDescription && (
                <p className="text-gray-700">{project.shortDescription}</p>
              )}
              
              {project.isPasswordProtected && (
                <div className="mt-2">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Password Protected
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-4">Raw Data:</h2>
        <pre className="overflow-auto p-4 bg-white rounded">
          {JSON.stringify(projects, null, 2)}
        </pre>
      </div>
    </div>
  );
} 
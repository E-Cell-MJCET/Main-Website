import Image from 'next/image';
import React from 'react';

// Define types for the data structure
type Project = {
  title: string;
  description: string;
  image: string;
};

// Define props type for the component
interface ProjectsProps {
  projects: {
    projects: Project[]; // Nested structure
  };
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  // Access the nested projects array
  const projectList = projects.projects;

  // Ensure projectList is an array
  if (!Array.isArray(projectList)) {
    console.error('Projects data is not an array:', projectList);
    
    return <div className="text-center text-red-600">Invalid projects data.</div>; // Fallback UI
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 py-12">
      <h2 className="mb-12 text-center text-4xl font-bold text-purple-400">Projects</h2>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {projectList.map((project, index) => (
          <div
            key={index}
            className="rounded-xl bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-300 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90"
          >
            <div className="overflow-hidden rounded-lg">
              <Image
                width={500}
                height={300}
                src={project.image}
                alt={project.title}
                className="h-48 w-full object-cover"
                loader={({ src }) => src} // Add a loader to avoid hydration issues
                unoptimized // Disable optimization if using external images
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-gray-800">{project.title}</h3>
            <p className="mt-4 text-gray-800">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

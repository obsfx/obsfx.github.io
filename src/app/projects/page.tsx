import { projectData } from '@/app/project-data';
import { ProjectItem } from '@/components/project-item';

export default function ProjectsPage() {
  return (
    <div>
      <title>Projects - Ömercan Balandı</title>
      <h1 className='text-gray-950'>Projects</h1>

      <p className='text-xs text-gray-400'>
        This is the collection of projects I{"'"}ve created in my spare time over the years.
      </p>

      <div className='-mx-3 grid pt-3 sm:grid-cols-2 md:gap-y-6'>
        {projectData.map((project, index) => (
          <ProjectItem key={index} title={project.name} description={project.description} />
        ))}
      </div>
    </div>
  );
}

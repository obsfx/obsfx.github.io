import { projectData } from '@/app/project-data';
import { ProjectItem } from '@/components/project-item';

export default function ProjectsPage() {
  return (
    <div>
      <title>Projects - Ömercan Balandı</title>
      <div className='flex flex-col gap-0.5'>
        <h1 className='text-2xl font-bold text-black'>Projects</h1>
        <p className='text-sm text-gray-500'>
          This is the collection of projects I{"'"}ve created in my spare time over the years.
        </p>
      </div>

      <div className='-mx-3 grid pt-4'>
        {projectData.map((project, index) => (
          <ProjectItem key={index} title={project.name} description={project.description} />
        ))}
      </div>
    </div>
  );
}

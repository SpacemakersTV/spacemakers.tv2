import { useRouter } from "next/router";


import { SimpleGrid } from '@mantine/core';
import Thumbnail from '../thumbnail';
import { ProjectType } from '../../../types/types';

type GalleryProps = {
  projects: ProjectType[];
  selectedTags: string[];
}

const Gallery = ({ projects, selectedTags }: GalleryProps) => {

  let filteredProjects = projects.filter((project) => {
    return selectedTags.every((tag) => project.tags.includes(tag));
  });

  console.log(projects);

  const router = useRouter();

  const handleOpen = (project: ProjectType) => {
    router.push({
      pathname: `/work/${project.id}`,
      query: { project: JSON.stringify(project) },
    });
  };

  //Sort projects by date
  filteredProjects = filteredProjects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const project_list = filteredProjects.map((project: ProjectType) => {
    if (project.thumbnail_url && project.id && project.title) {
      return <Thumbnail project={project} handleOpen={handleOpen} />
    }
    return null;
  }).filter(project => project !== null);

  return (
    <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
      {project_list}
    </SimpleGrid>)
};

export default Gallery;
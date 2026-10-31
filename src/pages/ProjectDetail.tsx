import { useParams } from "react-router-dom";
import { ProjectStory } from "@/components/projects/ProjectStory";
import { RepoDetail } from "@/components/projects/RepoDetail";
import { findProject } from "@/content/projects";

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const project = findProject(slug);

  return project ? <ProjectStory project={project} /> : <RepoDetail name={slug} />;
}

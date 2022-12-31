import { Project } from "./../../projects/project";
import { Projects } from "./../..//projects/projects";

export class LilyConfig {
  projects: Projects = new Projects([new Project("test", "testowy project")]);
}

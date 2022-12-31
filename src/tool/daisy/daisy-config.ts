import { Projects } from "src/projects/projects";
import { ToolConfig } from "../tool-config";

export class DaisyConfig extends ToolConfig {
  projects = new Projects();
}

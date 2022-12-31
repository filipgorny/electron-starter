import { Tool } from "../tool";
import { ProjectsCommand } from "./projects-command";

export class Lily extends Tool {
  name = "Devreport CLI Manager";

  get commands() {
    return [new ProjectsCommand()];
  }

  async run() {}
}

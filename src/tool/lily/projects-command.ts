import {
  Command,
  CommandArgument,
  CommandExecution,
  CommandOptionString,
  CommandResult,
} from "./../../cli/command/command";
import { LilyConfig } from "./lily-config";

import { terminal } from "terminal-kit";

export class ProjectOperationArgument extends CommandArgument {
  name = "operation";
  description = "Operation to perform (list, add, remove)";
}

export class ProjectSelectorOption extends CommandOptionString {
  name = "selector";
  description = "Project selector";
}

export class ProjectsCommand extends Command {
  name = "projects";
  description = "Projects management";

  get arguments() {
    return [new ProjectOperationArgument()];
  }

  get options() {
    return [new ProjectSelectorOption()];
  }

  term;

  async run(
    commandExecution: CommandExecution<LilyConfig>
  ): Promise<CommandResult> {
    this.term = terminal;

    switch (commandExecution.getArgumentValue("operation")) {
      case "list":
        return this.listProjects(commandExecution);
    }

    const commandResult = new CommandResult(true, "Test command ran");

    return commandResult;
  }

  async listProjects(
    commandExecution: CommandExecution<LilyConfig>
  ): Promise<CommandResult> {
    let attr;

    console.log(commandExecution.config);

    for (const project of commandExecution.config.projects) {
      attr = this.term.colorRgb(
        255 - Math.random() * 255,
        255,
        Math.random() * 128
      );

      this.term(`📓 ${project.name}`);
    }

    const commandResult = new CommandResult(true, "Test command ran");

    return commandResult;
  }
}

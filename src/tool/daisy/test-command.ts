import {
  Command,
  CommandExecution,
  CommandOptionBoolean,
  CommandResult,
} from "./../../cli/command/command";

export class TestCommand extends Command {
  name = "test";
  description = "Test command";

  arguments = [];

  get options() {
    const testOption = new CommandOptionBoolean("test", "test option");

    return [testOption];
  }

  async run(commandExecution: CommandExecution<any>): Promise<CommandResult> {
    const commandResult = new CommandResult(true, "Test command ran");

    return commandResult;
  }
}

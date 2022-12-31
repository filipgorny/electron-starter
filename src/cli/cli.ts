import {
  Command,
  CommandArgumentValue,
  CommandExecution,
  CommandOptionValue,
} from "./command/command";
import { program } from "commander";

export const cli = <T>(commands: Command[], config: T, args: string[]) => {
  program
    .name("Devreport CLI tool")
    .description("Official tool for managing your development reports")
    .version(process.env.npm_package_version);

  commands.forEach((command) => {
    const programCommand = program.command(command.name);
    programCommand.description(command.description);

    command.arguments.forEach((argument) => {
      programCommand.argument(argument.name, argument.description);
    });

    command.options.forEach((option) => {
      const optionName =
        option.optionType === "boolean"
          ? `--${option.name}`
          : `--${option.name} <value>`;

      programCommand.option(optionName, option.description);
    });

    programCommand.action((...args) => {
      const commandOptionsValues: CommandOptionValue[] = [];
      const commandArgumentsValues: CommandArgumentValue[] = [];

      const programCommandOptionsValues = args.pop();

      for (const programCommandOptionValue of programCommandOptionsValues.options) {
        const programOptionName = programCommandOptionValue.long.replace(
          "--",
          ""
        );

        const option = command.options.find(
          (option) => option.name === programOptionName
        );

        commandOptionsValues.push(
          new CommandOptionValue(option, programCommandOptionValue)
        );
      }

      for (const programCommandArgumentIndex in args) {
        const argument = command.arguments[programCommandArgumentIndex];

        commandArgumentsValues.push(
          new CommandArgumentValue(argument, args[programCommandArgumentIndex])
        );
      }

      // execute command action

      const execution = new CommandExecution<T>(
        config,
        commandArgumentsValues,
        commandOptionsValues
      );

      command.run(execution);
    });
  });

  program.parse([...process.argv, ...args]);
};

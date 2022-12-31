import { Config } from "src/config/config";

export abstract class CommandOption {
  abstract name: string;
  abstract description: string;

  abstract optionType;
}

export abstract class CommandOptionBoolean extends CommandOption {
  abstract name: string;
  abstract description: string;
  optionType = "boolean";
}

export abstract class CommandOptionString extends CommandOption {
  abstract name: string;
  abstract description: string;

  optionType = "string";
}

export class CommandOptionValue {
  constructor(public commandOption: CommandOption, public value: string) {}
}

export abstract class CommandArgument {
  abstract name: string;
  abstract description: string;
}

export class CommandArgumentValue {
  constructor(public argument: CommandArgument, public value: string) {}
}

export class CommandExecution<T> {
  constructor(
    public config: T,
    public commandArgumentsValues: CommandArgumentValue[],
    public commandOptionsValues: CommandOptionValue[]
  ) {}

  getArgumentValue(argumentName: string): string {
    return this.commandArgumentsValues.find(
      (commandArgumentValue) =>
        commandArgumentValue.argument.name === argumentName
    ).value;
  }

  getOptionValue(optionName: string): string {
    return this.commandOptionsValues.find(
      (commandOptionValue) =>
        commandOptionValue.commandOption.name === optionName
    ).value;
  }
}

export class CommandResult {
  constructor(public success: boolean, public message: string) {}
}

export abstract class Command {
  abstract name: string;
  abstract description: string;

  abstract options: CommandOption[];
  abstract arguments: CommandArgument[];

  abstract run(commandExecution: CommandExecution<any>): Promise<CommandResult>;
}

import { Command } from "src/cli/command/command";

export abstract class Tool {
  abstract name: string;
  abstract commands: Command[];
}

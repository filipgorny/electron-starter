import { Tool } from "./tool";
import { cli } from "./../cli/cli";
import { Config } from "src/config/config";

export class Process<TConfig> {
  processConfig: TConfig;
  tool: Tool;

  constructor(tool: Tool, processConfig: TConfig) {
    this.tool = tool;
    this.processConfig = processConfig;
  }

  run<TConfig>(args: string[]) {
    const commands = this.tool.commands;

    cli(commands, this.processConfig, args);
  }
}

export class Runner<TConfig> {
  processConfig: TConfig;

  constructor(private config: Config) {}

  async prepare(tool: Tool, defaultConfigValue: TConfig) {
    const process = new Process<TConfig>(
      tool,
      await this.config.read<TConfig>(tool.name, defaultConfigValue)
    );

    return process;
  }
}

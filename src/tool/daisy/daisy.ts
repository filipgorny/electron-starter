import { Tool } from "../tool";
import { TestCommand } from "./test-command";

export class Daisy extends Tool {
  name = "daisy";

  get commands() {
    return [new TestCommand()];
  }

  async run() {}
}

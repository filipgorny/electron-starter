import { terminal } from "terminal-kit";

export const log = (message: string) => {
  const icon = "👀";
  const time = new Date().toLocaleTimeString();

  terminal
    .color256("yellow")
    .nextLine(1)(`${icon} [${time}] `)
    .bold(message)("\n")
    .nextLine(2);
};

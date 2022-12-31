import { Config } from "./config/config";
import { log } from "./logger/log";
import { Lily } from "./tool/lily/lily";
import { LilyConfig } from "./tool/lily/lily-config";
import { Runner } from "./tool/runner";

const config = new Config("devprojects-lily");
const runner = new Runner(config);

log("Running app...");

(async () => {
  const process = await runner.prepare(new Lily(), new LilyConfig());
  await process.run(["projects", "list"]);
})();

log("Exiting...");

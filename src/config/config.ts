import os from "os";
import path from "path";
import { toolName } from "./../tool-name";
import { JsonDB, Config as JsonConfig } from "node-json-db";

export class Config {
  private loaded = false;
  private db: JsonDB;

  constructor(private configName: string) {}

  private getDatabaseFilePath() {
    return path.join(os.homedir(), toolName(), this.configName);
  }

  private load() {
    if (this.loaded) {
      return;
    }

    this.db = new JsonDB(
      new JsonConfig(`${this.getDatabaseFilePath()}.json`, true, true, "/")
    );
  }

  public async read<T>(path: string): Promise<T> {
    this.load();

    return await this.db.getObject<T>(path);
  }

  public write(path: string, object: object) {
    this.db.push(path, object);
  }
}

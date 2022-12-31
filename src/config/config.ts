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

  public async read<T>(path: string, defaultValue: T): Promise<T> {
    this.load();

    const value = await this.db.getObject<T>(path);

    const isSaved = (await this.db.exists(`${path}/_saved`)) === true;

    if (!value || !isSaved) {
      this.db.push(path, defaultValue);
      this.db.push(`${path}/_saved`, true);

      return defaultValue;
    }

    return value;
  }

  public write(path: string, object: object) {
    this.db.push(path, object);
  }
}

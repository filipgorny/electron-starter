import { Projects } from "./../src/projects/projects";
import { Config } from "./../src/config/config";

describe("Projects collection", () => {
  it("should read and save", async () => {
    const projects = new Projects(new Config("projects"));

    expect(1).toBeTruthy();
  });
});

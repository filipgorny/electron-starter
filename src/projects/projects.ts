import { Project } from "./project";

export class Projects {
  constructor(private value: Project[] = []) {
    this.value = value;
  }

  list() {
    return this.value;
  }

  add(project: Project) {
    this.value.push(project);
  }

  remove(project: Project) {
    const index = this.value.indexOf(project);

    if (index > -1) {
      this.value.splice(index, 1);
    }
  }

  [Symbol.iterator]() {
    return this.value[Symbol.iterator]();
  }
}

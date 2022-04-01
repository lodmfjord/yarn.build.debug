import { PackageName, Graphs, typeIsPackageName } from "./interfaces";

export class Graph {
  _graphs: Graphs = {};

  getTopPackages(): PackageName[] {
    return Object.keys(this._graphs)
      .filter(typeIsPackageName)
      .filter((it) => this._graphs[it].length === 0);
  }

  getAllKeys(): PackageName[] {
    return Object.keys(this._graphs) as PackageName[];
  }

  getRequired(name: PackageName): PackageName[] {
    return this._graphs[name] || [];
  }

  findCircularDependencies(): PackageName[] {
    const fn = (keys: PackageName[]): boolean => {
      const key = keys[keys.length - 1];

      if (new Set(keys).size !== keys.length) {
        return true;
      }

      const packages = this._graphs[key];
      const hasCircular = !!packages.find((key) => fn([...keys, key]));

      return hasCircular;
    };

    return Object.keys(this._graphs)
      .filter(typeIsPackageName)
      .filter((key) => fn([key]));
  }

  initNode(name: PackageName): void {
    if (!this._graphs[name]) {
      this._graphs[name] = [];
    }
  }

  addNode(from: PackageName, to: PackageName): void {
    const arr = Array.from(
      new Set([...(this._graphs[from] || []), to])
    ) as PackageName[];

    this._graphs[from] = arr;
  }
}

import { BaseCommand } from "@yarnpkg/cli";
import { Configuration, Project } from "@yarnpkg/core";
import { Command, Usage } from "clipanion";
import { Graph } from "./graph";
import { Output } from "./output";
import { visualizeWorkspace } from "./visualize";


export default class DiagramQuery extends BaseCommand {
  static paths = [[`diagram`]];

  static usage: Usage = Command.Usage({
    category: `REON commands`,
    description: `Report on monorepo.`,
    details: `
          This command will give a basic report on the monorepo, top packages and circular dependencies.
        `,
  });

  async execute(): Promise<0 | 1> {
    const configuration = await Configuration.find(
      this.context.cwd,
      this.context.plugins
    );
    const { project, workspace } = await Project.find(
      configuration,
      this.context.cwd
    );

    if (!workspace) {
      // Workspace not found
      return 0;
    }    
    const graph = new Graph();
    const root = project.topLevelWorkspace;
    const workspaces = root.getRecursiveWorkspaceChildren();

    workspaces.forEach((workspace) => {
      visualizeWorkspace({workspace, graph});
    });

    Output({graph, configuration, showDiagram: true, showCircular: false, showTopPackages: false});
    
    return 0;
  }
}

import { BaseCommand } from "@yarnpkg/cli";
import { Configuration, Project } from "@yarnpkg/core";
import { Command, Usage } from "clipanion";
import { Graph } from "./graph";
import { Output } from "./output";
import { visualizeWorkspace } from "./visualize";


export default class ReportQuery extends BaseCommand {
  static paths = [[`report`]];

  static usage: Usage = Command.Usage({
    category: `REON commands`,
    description: `Visualizes the build graph of a workspace`,
    details: `
          This command will display the build graph of the current workspace.
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

    Output({graph, configuration, showDiagram: false, showCircular: true, showTopPackages: true});
    
    return 0;
  }
}

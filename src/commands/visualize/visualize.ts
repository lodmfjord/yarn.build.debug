import { Workspace } from "@yarnpkg/core";
import { getPackageName } from "./get-name";
import { Graph } from "./graph";

export const visualizeWorkspace = ({workspace, graph}: {
    workspace: Workspace | null,
    graph: Graph
} ): void => {
    if (!workspace) {
        return;
    }
    const dependencies = workspace.getRecursiveWorkspaceDependencies();
    const packageName = getPackageName(workspace.locator);

    graph.initNode(packageName);

    dependencies.forEach((dependency) => {
        const name = getPackageName(dependency.locator);

        graph.addNode(packageName, name);
    });

};

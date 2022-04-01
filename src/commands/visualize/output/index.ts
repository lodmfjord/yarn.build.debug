import { Configuration, FormatType, formatUtils } from "@yarnpkg/core";
import { Graph } from "../graph";
import { PackageName } from "../interfaces";
import { paddingTop } from "./padding-top";


interface Props {
    graph: Graph;
    configuration: Configuration;
    showTopPackages?: boolean;
    showCircular?: boolean;
    showDiagram?: boolean;
}
export const Output = ({graph, configuration, showCircular = true, showDiagram = true, showTopPackages = true}: Props): void => {
    
    paddingTop({ padding: 1 });

    const format = (string: string, color: string) => {
        return formatUtils.pretty(configuration, string, color);
      };
  
    const topPackages = graph.getTopPackages();
    const circularDependencies = graph.findCircularDependencies();

    if (showTopPackages && topPackages) {
        const COLOR = FormatType.NAME;

        process.stdout.write("Top packages:");
        topPackages.forEach((name) => process.stdout.write(format(`\n  ${name}`, COLOR)));
        process.stdout.write("\n");
    }

    if (showCircular && circularDependencies.length) {
        const COLOR = FormatType.REMOVED;

        process.stdout.write("Circular dependencies:");
        circularDependencies.forEach((name) => process.stdout.write(format(`\n  ${name}`, COLOR)));
        process.stdout.write("\n");
    }
    
    if (showDiagram) {
    const dot = ['digraph G {'];
    const fn = (key: PackageName) => {
        const required = graph.getRequired(key);
        
        for (const item of required) {
            dot.push(`\t "${key}" -> "${item}"`);
        }
        
    };

    for (const topPackage of graph.getAllKeys()) {
        fn(topPackage);
    }

    dot.push('}');
    
    const dotString = Array.from(new Set(dot)).join('\n');
    const url = `https://dreampuf.github.io/GraphvizOnline/#${encodeURIComponent(dotString)}`;

    process.stdout.write(url);
    }
};

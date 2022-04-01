import { Plugin } from "@yarnpkg/core";

import {report, diagram} from "./commands/visualize";


const plugin: Plugin = {
  commands: [report, diagram],
};

export default plugin;

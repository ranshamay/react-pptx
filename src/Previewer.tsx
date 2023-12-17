import * as TreeCreator from "./BasicPPT";

export interface Graph {
  [key: string]: string[];
}
const createOutputFilename = () => {
  const now = new Date();
  return `visualized-${now.getDate()}${
    now.getMonth() + 1
  }${now.getFullYear()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}.pptx`;
};

export function createPresentation(graph: Graph, root: string) {
  TreeCreator.CreateTree(graph, root).writeFile({
    fileName: createOutputFilename(),
  });
}

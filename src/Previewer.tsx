import * as TreeCreator from "./BasicPPT";
import { NamesMapper } from "./Uploader";
export interface Graph {
  [key: string]: string[];
}
const createOutputFilename = () => {
  const now = new Date();
  return `visualized-${now.getDate()}${
    now.getMonth() + 1
  }${now.getFullYear()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}.pptx`;
};

export function createPresentation({
  graph,
  namesMapper,
  root,
  heirarchyLevel,
}: {
  graph: Graph;
  namesMapper: NamesMapper;
  root: string;
  heirarchyLevel: number;
}) {
  TreeCreator.CreateTree({
    graph,
    namesMapper,
    start: root,
    heirarchyLevel,
  }).writeFile({
    fileName: createOutputFilename(),
  });
}

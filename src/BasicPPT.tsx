import pptxgen from "pptxgenjs";
import { NamesMapper } from "./Uploader";
import { extractTreeLevels, drawSubTree } from "./utils/tree";
export interface NodeProp {
  [name: string]: string[];
}

export const CreateTree = ({
  graph,
  namesMapper,
  start,
  heirarchyLevel,
}: {
  graph: NodeProp;
  namesMapper: NamesMapper;
  start: string;
  heirarchyLevel: number;
}) => {
  let pptx = new pptxgen();
  const levels = extractTreeLevels({ graph, root: start });
  (levels[heirarchyLevel] || levels[0]).nodes.forEach((subroot) => {
    let slide = pptx.addSlide();
    drawSubTree({
      root: subroot.name,
      graph,
      slide,
      namesMapper,
      pptx,
      levelMap: levels,
    });
  });

  return pptx;
};

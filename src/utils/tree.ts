import { createNode } from "./ppt";
import { NamesMapper } from "../Uploader";
import pptxgen from "pptxgenjs";
export type LevelMap = {
  [key: string]: {
    count: number;
    nodes: Node[];
  };
};

export type Node = {
  name: string;
  level: number;
  levelIdx: number;
};

export type NodeProp = {
  [name: string]: string[];
};
export const traverseTreeBFS = ({
  root,
  graph,
  customBehaviour,
}: {
  root: string;
  graph: NodeProp;
  customBehaviour?: any;
}) => {
  let level = 0;
  const rootNode = { name: root, level, levelIdx: 0 };
  const levelMap: LevelMap = { 0: { count: 1, nodes: [rootNode] } };
  const queue = [rootNode];
  while (queue.length) {
    const subarr = [];
    let n = queue.length;
    levelMap[`${level}`] = { count: n, nodes: [] };
    level++;
    for (let levelIdx = 0; levelIdx < n; levelIdx++) {
      let vertex = queue.shift();
      subarr.push(vertex);
      if (graph?.[vertex!.name]) {
        // eslint-disable-next-line no-loop-func
        graph[vertex!.name]?.map((x, idx) =>
          queue.push({
            name: x,
            level,
            levelIdx: idx,
          })
        );
      }
    }

    while (subarr.length) {
      let vertex = subarr.pop();
      levelMap[`${level - 1}`]?.nodes.push(vertex!);
      customBehaviour?.(vertex);
    }
  }
  return levelMap;
};

export const extractTreeLevels = ({
  root,
  graph,
}: {
  root: string;
  graph: NodeProp;
}) => {
  return traverseTreeBFS({
    root,
    graph,
  });
};

export const drawSubTree = ({
  root,
  graph,
  slide,
  pptx,
  levelMap,
  namesMapper,
}: {
  root: string;
  graph: NodeProp;
  slide: pptxgen.Slide;
  pptx: pptxgen;
  levelMap: LevelMap;
  namesMapper: NamesMapper;
}) => {
  traverseTreeBFS({
    root,
    graph,
    customBehaviour: (vertex: Node) =>
      createNode({
        data: vertex!,
        slide,
        pptxgen: pptx,
        levelMap,
        namesMapper,
      }),
  });
};

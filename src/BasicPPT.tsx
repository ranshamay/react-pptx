import pptxgen from "pptxgenjs";

export interface NodeProp {
  [name: string]: string[];
}

const LEFT = 0;
const RIGHT = 10;

const TOP = 0;
const BOTTOM = 10;

const SHAPE_WIDTH = 1.5;
const SHAPE_HEIGHT = 0.8;
let RIGHT_MOST = 0;
let TOP_MOST = 0;

const normalizeX = (value: number) => {
  return normalize(value, LEFT, RIGHT);
};
const normalizeY = (value: number) => {
  return normalize(value, TOP, BOTTOM);
};

const normalize = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};

export const CreateTree = (nodes: NodeProp, start: string) => {
  let pptx = new pptxgen();
  let slide = pptx.addSlide();
  const stack: [{ name: string; level: number } | null] = [
    { name: start, level: 0 },
  ];
  const visited = new Set();
  let level = 0;
  while (stack.length) {
    const vertex = stack.pop();
    if (vertex === null) {
      RIGHT_MOST += SHAPE_WIDTH;
      TOP_MOST = SHAPE_HEIGHT * level;
    } else {
      if (!visited.has(vertex?.name)) {
        visited.add(vertex?.name);
        // @ts-ignore
        createNode(vertex, slide, pptx);

        // @ts-ignore
        if (!nodes[vertex.name]) {
          stack.push(null);
        } else {
          level++;
          // @ts-ignore
          for (const neighbor of nodes[vertex.name]) {
            stack.push({ name: neighbor, level: level });
          }
        }
        TOP_MOST += SHAPE_HEIGHT * 2;
      }
    }
  }

  return pptx;
};

const createNode = (
  data: { name: string; level: number },
  slide: pptxgen.Slide,
  pptxgen: pptxgen
) => {
  slide.addText(`${data.name}-${data.level}`, {
    shape: pptxgen.ShapeType.roundRect,
    rectRadius: 0.2,
    x: `${normalizeX((RIGHT - LEFT) / 2 - SHAPE_WIDTH / 2 - RIGHT_MOST)}%`,
    y: `${normalizeY(TOP_MOST)}%`,
    w: SHAPE_WIDTH,
    h: SHAPE_HEIGHT,
    fill: { color: pptxgen.SchemeColor.accent1 },
  });
};

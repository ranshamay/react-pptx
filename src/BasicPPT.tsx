import pptxgen from "pptxgenjs";

export interface NodeProp {
  [name: string]: string[];
}

type LevelMap = {
  [key: string]: number;
};

const LEFT = 0;
const RIGHT = 10;

const TOP = 0;
const BOTTOM = 10;

const SHAPE_WIDTH = 1.5;
const SHAPE_HEIGHT = 0.8;

const normalizeX = (value: number) => {
  const x = normalize(value, LEFT, RIGHT);
  console.log(x);
  return x;
};
const normalizeY = (value: number) => {
  return normalize(value, TOP, BOTTOM);
};

const normalize = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};

export const CreateTree = (graph: NodeProp, start: string) => {
  let pptx = new pptxgen();
  let slide = pptx.addSlide();
  let level = 0;
  const levelMap: LevelMap = { 0: 1 };
  const queue = [{ name: start, level, levelIdx: 0 }];
  while (queue.length) {
    const subarr = [];
    let n = queue.length;
    levelMap[`${level}`] = n;
    level++;
    for (let levelIdx = 0; levelIdx < n; levelIdx++) {
      let vertex = queue.shift();
      subarr.push(vertex);
      // @ts-ignore
      if (graph?.[vertex.name]) {
        // @ts-ignore
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
      // @ts-ignore
      createNode(vertex, slide, pptx, levelMap);
    }
  }
  return pptx;
};

const createNode = (
  data: { name: string; level: number; levelIdx: number },
  slide: pptxgen.Slide,
  pptxgen: pptxgen,
  levelMap: LevelMap
) => {
  slide.addText(`${data.name}-${data.level}`, {
    rtlMode: true,
    align: pptxgen.AlignH.center,
    shape: pptxgen.ShapeType.roundRect,
    rectRadius: 0.2,
    x: `${normalizeX(
      (RIGHT - LEFT) / 2 +
        levelMap[data.level] -
        SHAPE_WIDTH * (data.levelIdx + 1) -
        SHAPE_WIDTH / 2
    )}%`,
    y: `${normalizeY(data.level * SHAPE_HEIGHT * 2)}%`,
    w: SHAPE_WIDTH,
    h: SHAPE_HEIGHT,
    fill: { color: pptxgen.SchemeColor.accent1 },
  });
};

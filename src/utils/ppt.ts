import pptxgen from "pptxgenjs";
import { Node, LevelMap } from "./tree";
import { NamesMapper } from "../Uploader";

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

export const createNode = ({
  data,
  pptxgen,
  levelMap,
  slide,
  namesMapper,
}: {
  data: Node;
  slide: pptxgen.Slide;
  pptxgen: pptxgen;
  levelMap: LevelMap;
  namesMapper: NamesMapper;
}) => {
  slide.addText(`${namesMapper[data.name]}-${data.level}`, {
    rtlMode: true,
    align: pptxgen.AlignH.center,
    shape: pptxgen.ShapeType.roundRect,
    rectRadius: 0.2,
    x: `${normalizeX(
      (RIGHT - LEFT) / 2 +
        levelMap[data.level].count -
        SHAPE_WIDTH * (data.levelIdx + 1) -
        SHAPE_WIDTH / 2
    )}%`,
    y: `${normalizeY(data.level * SHAPE_HEIGHT * 2)}%`,
    w: SHAPE_WIDTH,
    h: SHAPE_HEIGHT,
    fill: { color: pptxgen.SchemeColor.accent1 },
  });
};

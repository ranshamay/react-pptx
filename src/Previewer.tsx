import * as TreeCreator from "./BasicPPT";
const graph = {
  aaa: ["bbb", "ccc"],
  bbb: ["ddd", "gggg"],
  ccc: ["eee", "mmm"],
  ddd: ["fff"],
};
const root = "aaa";

const createOutputFilename = () => {
  const now = new Date();
  return `visualized-${now.getDate()}${
    now.getMonth() + 1
  }${now.getFullYear()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}.pptx`;
};

function App() {
  function runDemo() {
    TreeCreator.CreateTree(graph, root).writeFile({
      fileName: createOutputFilename(),
    });
  }

  return (
    <button type="button" onClick={(_ev) => runDemo()}>
      Create PPT
    </button>
  );
}

export default App;

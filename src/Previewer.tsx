import * as TreeCreator from "./BasicPPT";
const graph = {
  aaa: ["bbb", "ccc"],
  bbb: ["ddd", "gggg"],
  ccc: ["eee", "mmm"],
  ddd: ["fff"],
};
const root = "aaa";

function App() {
  function runDemo() {
    TreeCreator.CreateTree(graph, root).writeFile({
      fileName: "pptxgenjs-demo-react.pptx",
    });
  }

  return (
    <button type="button" onClick={(_ev) => runDemo()}>
      Create PPT
    </button>
  );
}

export default App;

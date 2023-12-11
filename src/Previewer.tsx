import * as TreeCreator from "./BasicPPT";
const graph = {
  aaa: ["bbb", "ccc"],
  bbb: ["ddd", "gggg"],
  ccc: ["eee", "mmm"],
  ddd: ["fff"],
};

function App() {
  function runDemo() {
    TreeCreator.CreateTree(graph, "aaa").writeFile({
      fileName: "pptxgenjs-demo-react.pptx",
    });
  }

  return (
    <button
      type="button"
      className="btn btn-success w-100 me-3"
      onClick={(_ev) => runDemo()}
    >
      Run Demo
    </button>
  );
}

export default App;

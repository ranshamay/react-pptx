import React from "react";
import { parseXLS, ExcelData } from "./xlsParser";
import { createPresentation, Graph } from "./Previewer";

let rootNode: string | undefined = undefined;
let fileUploadData: File | undefined;

const setRootNodeName = (e: React.FormEvent<HTMLInputElement>) => {
  rootNode = e?.currentTarget.value;
};

const setFileUploadData = (e: React.ChangeEvent<HTMLInputElement>) => {
  fileUploadData = e?.target?.files?.[0];
};

const run = () => {
  if (fileUploadData && rootNode) {
    parseXLS(fileUploadData, cb);
  }
};

const parseXlsAsTree = (data: ExcelData | undefined): Graph => {
  const graph: Graph = {};
  if (data) {
    const sheets = data.sheets;
    const sheetNames = Object.keys(sheets);
    sheetNames.forEach((sheetName) => {
      const sheet = sheets[sheetName];
      sheet.forEach((row) => {
        const keys = row.filter((v, idx) => idx % 2 === 0);
        keys.forEach((key, idx) => {
          if (idx < keys.length - 1) {
            if (!graph[key]) {
              graph[key] = [];
            }
            graph[key].push(keys[idx + 1]);
          }
        });
      });
    });
  }
  return graph;
};

const cb = (data: ExcelData | undefined) => {
  if (data) {
    const graph = parseXlsAsTree(data);
    if (rootNode) {
      createPresentation(graph, rootNode);
    }
  }
};
function Uploader() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploadData(event);
  };

  return (
    <form encType="multipart/form-data">
      <input
        id="upload"
        type="file"
        name="files[]"
        onChange={handleFileChange}
      />
      <input
        type="text"
        name="name"
        placeholder="מאיפה להתחיל? "
        onChange={setRootNodeName}
      />
      <input type="button" value="סע" onClick={run} />
    </form>
  );
}

export default Uploader;

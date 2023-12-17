import React from "react";
import { parseXLS, ExcelData } from "./xlsParser";
import { createPresentation, Graph } from "./Previewer";
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
    createPresentation(graph, "123");
  }
};
function Uploader() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      parseXLS(event?.target?.files?.[0], cb);
    }
  };

  return (
    <form encType="multipart/form-data">
      <input
        id="upload"
        type="file"
        name="files[]"
        onChange={handleFileChange}
      />
      <input type="submit" value="Upload" />
    </form>
  );
}

export default Uploader;

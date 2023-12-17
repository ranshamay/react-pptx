// @ts-nocheck
import React from "react";
import { parseXLS, ExcelData } from "./xlsParser";
import { createPresentation, Graph } from "./Previewer";
import { message, Input } from "antd";

import Upload from "./components/Upload";
let rootNode: string | undefined = undefined;

const setRootNodeName = (e: React.FormEvent<HTMLInputElement>) => {
  rootNode = e?.currentTarget.value;
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

const cb = (data: ExcelData | undefined, e: any) => {
  if (data) {
    const graph = parseXlsAsTree(data);
    if (rootNode) {
      createPresentation(graph, rootNode);
    }
  }

  onChange({
    file: {
      status: "done",
      name: data?.fileName,
      response: JSON.stringify({ status: "success" }),
    },
    event: { success: true },
  });
};

const onChange = (info) => {
  const { status } = info.file;
  if (status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error" || !status) {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const beforeUpload = () => {
  return !!rootNode;
};

function Uploader() {
  return (
    <form encType="multipart/form-data">
      <Input
        type="text"
        name="name"
        placeholder="מאיפה להתחיל?"
        onChange={setRootNodeName}
      />
      <Upload
        action={(e) => parseXLS(e.file, cb)}
        onChange={onChange}
        beforeUpload={beforeUpload}
      />
    </form>
  );
}

export default Uploader;

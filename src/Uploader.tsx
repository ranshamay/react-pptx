import React from "react";
import { parseXLS, ExcelData } from "./xlsParser";
import { createPresentation, Graph } from "./Previewer";
import { message, Input } from "antd";

import Upload from "./components/Upload";
let rootNode: string | undefined = undefined;
let heirarchyLevel = 0;

const setRootNodeName = (e: React.FormEvent<HTMLInputElement>) => {
  rootNode = e?.currentTarget.value;
};
const setRootHeirarchyLevelName = (e: React.FormEvent<HTMLInputElement>) => {
  heirarchyLevel = +e?.currentTarget.value;
};

export interface NamesMapper {
  [key: string]: string;
}
const namesMapper: NamesMapper = {};

const parseXlsAsTree = (data: ExcelData | undefined): Graph => {
  const graph: Graph = {};
  if (data) {
    const sheets = data.sheets;
    const sheetNames = Object.keys(sheets);
    sheetNames.forEach((sheetName) => {
      const sheet = sheets[sheetName];
      sheet.forEach((row) => {
        const keys = Array.apply(null, Array(row.length / 2)).map((_, idx) => {
          if (row[idx * 2]) {
            namesMapper[row[idx * 2]] = row[idx * 2 + 1];
            return row[idx * 2];
          }
        });

        keys.forEach((key, idx) => {
          if (idx < keys.length - 1) {
            if (!graph[`${key}`]) {
              graph[`${key}`] = [];
            }
            graph[`${key}`].push(keys[`${idx + 1}`]!);
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
      createPresentation({
        graph,
        namesMapper,
        root: rootNode,
        heirarchyLevel,
      });
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

const onChange = (info: any) => {
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
        placeholder="מאיפה להתחיל?"
        onChange={setRootNodeName}
      />
      <Input
        type="text"
        placeholder="רמת היררכיה"
        onChange={setRootHeirarchyLevelName}
      />
      <Upload
        action={(e: any) => parseXLS(e.file, cb)}
        onChange={onChange}
        beforeUpload={beforeUpload}
      />
    </form>
  );
}

export default Uploader;

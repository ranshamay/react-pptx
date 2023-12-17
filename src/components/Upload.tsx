import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

function App({
  action,
  onChange,
  beforeUpload,
}: {
  action: any;
  onChange: any;
  beforeUpload: any;
}) {
  return (
    <Dragger
      {...props}
      customRequest={action}
      onChange={onChange}
      beforeUpload={beforeUpload}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">לחץ או גרור קבצים</p>
    </Dragger>
  );
}

export default App;

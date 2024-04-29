import React, { useState } from 'react';
import { Upload, Button, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('normal');

  const onChange = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      setUploadPercent(100);
      setUploadStatus('success');
      console.log(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      setUploadPercent(70);
      setUploadStatus('exception');
      console.error(`${info.file.name} upload failed.`);
    }
  };

  const uploadProps = {
    name: 'file',
    action: 'http://localhost:3000/upload', // backend endpoint for file upload
    onChange: onChange,
    onProgress: ({ percent }) => {
      setUploadPercent(percent);
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
      <Progress type="circle" percent={uploadPercent} status={uploadStatus} />
    </Upload>
  );
};

export default FileUpload;

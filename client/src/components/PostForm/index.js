import React, {useCallback} from "react";
import { useDropzone } from "react-dropzone";

const PostForm = () => {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

  return (
    <section className="container">
      <div id="Upload" {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Upload An Image</p>
      </div>
      <aside>
        <ul id="fileChoice">{files}</ul>
      </aside>
    </section>
  );
}

export default PostForm
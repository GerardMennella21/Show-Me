import React, {useState, useMemo, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ADD_IMAGE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '25px',
  borderWidth: 2,
  borderRadius: 5,
  borderColor: '#FFFCF9',
  borderStyle: 'solid',
  color: '#FFFCF9',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent(props) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  

  const fileList = files.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const thumbs = files.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
      />
    </div>
  ));

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addImage({
        variables: { imageText }
      })

      setText('');
      setCharacterCount(0);
    } catch (error) {
      console.error(error)
    }
  }
  const [addImage, { error }] = useMutation(ADD_IMAGE)
  const [imageText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = event => {
    if (event.target.value.length <= 280) {
        setText(event.target.value);
        setCharacterCount(event.target.value.length);
    }
};

  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  console.log(files);

  return (
    <section>      
      <div id='imageUpload' {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div id='DZText'>
            Upload An Image <br />
            (Click or Drag & Drop)
        </div>
      </div>
      <aside>
        {thumbs}
        <ul id='fileList'>{fileList}</ul>
      </aside>
      <form onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Enter Caption Here"
          value={imageText}
          onChange={handleChange}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
      <p>
            Character Count: {characterCount}/280
            {error && <span>Something went wrong...</span>}
        </p>
    </section>  
  )
}
export default DropzoneComponent;
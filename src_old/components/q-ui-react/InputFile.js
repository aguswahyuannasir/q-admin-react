import React,{Component} from "react";// Fragment
import {string, bool, func} from 'prop-types';
import Dropzone from 'react-dropzone';

export default class InputFile extends Component{
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     files: [],
  //   };
  // }

  render(){
    const {onDrop, innerRef, multiple, dropClass, textNoActive, textActive} = this.props;// state

    return (
      <div ref={innerRef} className="dropZOne">
        <Dropzone onDrop={onDrop} multiple={multiple}>
          {({getRootProps, getInputProps, isDragActive}) => (
            <div {...getRootProps()} className={dropClass}>
              <input {...getInputProps()} />
              {isDragActive ? textActive : textNoActive}
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

InputFile.defaultProps = {
  textNoActive: "Drag 'n' drop files here, or click to select files",
  textActive: "Drop file here"
};

InputFile.propTypes = {
  dropClass: string,
  textNoActive: string,
  textActive: string,
  multiple: bool,
  onDrop: func
};

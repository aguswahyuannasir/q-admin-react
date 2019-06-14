import React,{Component,Fragment} from 'react';
import {bindMethods} from '../../Qutils';
import classNames from 'classnames';
// import { Formik } from "formik";
// import * as Yup from 'yup';// import yup from "yup";
import Dropzone from "react-dropzone";// import Dropzone from '../../react-dropzone';
import Thumb from './Thumb';

// import Recaptcha from "../Recaptcha";
// import Recaptcha from "react-recaptcha";

import {ButtonGroup,Button,UncontrolledButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem,
        Modal,ModalHeader,ModalBody,ModalFooter,UncontrolledTooltip} from 'reactstrap';// ../../reactstrap

import ReactCropper from '../crop';

import Swal from 'sweetalert2';
import withReactContent from '../../sweetalert2-react-content';

const Qswal = withReactContent(Swal);

export default class Qfile extends Component{
  constructor(props){
    super(props)
    this.state = {
      files:[],// FOR store dropzone files
      modal:false,// FOR open modal edit img
      imgModal:null,// FOR store img file to croppper
      imgEditIndex:null,// FOR store img file index to croppper
      guideModal:false,// FOR modal guide edit img
      tagModal:false,// DEV FOR tags file
      imgTag:null,// FOR store img file to tags
      imgTagIndex:null,// OPTION FOR store img file index to tags

      src:null,
      cropResult:null,
      cropState:false,
      zoomImg:0,
      rotateTo:0,
    };

    // this.tmpFile = [];// DEV FOR store temp file to edit
    this.fData = new FormData();// FOR submit formData

    bindMethods.call(this,[
      'onDrop',
      'modalPrev',
      // 'removeFile',
      'clearFiles',
      'errorImgLoad',
      'cancelCropCover',
      'zoomInOut',
      'onRotate',
      'cropImage',
      'resetCrop',
      'saveCrop',
      'modalGuide',// FOR modal guide edit img
      'tagsFile',// DEV FOR tags file
    ]);
  }
  
  componentDidMount(){

  }

  componentWillUnmount(){
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(f => URL.revokeObjectURL(f.thumb))
  }

  noop(e){
    e.preventDefault();
  }

// Add files
  onDrop(files){
    // const {accept} = this.state;
    console.log(files);

    const newFile = files.map(f => Object.assign(f,{
      thumb:URL.createObjectURL(f)
    }));

    this.setState(state => ({
      files:state.files.concat(newFile)
    }));
  }

// open modal file preview & edit
  modalPrev(data,idx){
    // const et = e.target;
    const me = this;
    if(!me.state.modal){
      console.log(data);
      me.setState({
        modal:true,
        imgModal:data,
        imgEditIndex:idx // FOR store img file index to croppper
      },
      () => {
          console.warn('state NOW');
          console.log(this.state);
        }
      );
    }
    else if(me.state.modal && me.state.cropResult){
      Qswal.fire({
        type:"info",
        title:<small>Are you sure to close?!<br/>Your edit data will be lost</small>,
        allowOutsideClick:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        showCancelButton:true,
        confirmButtonText:"YES",
        cancelButtonText:"NO"
      }).then((x) => {
        if(x.value){
          setTimeout(() => {
            me.setState({
              modal:false
            });
          },300);
        }
      });
    }
    else{
      me.setState({modal:false});
      // Qswal.fire({
      //   type:"info",
      //   title:<small>Are you sure to close?!<br/>Your edit data will be lost</small>,
      //   allowOutsideClick:false,
      //   allowEscapeKey:false,
      //   allowEnterKey:false,
      //   showCancelButton:true,
      //   confirmButtonText:"YES",
      //   cancelButtonText:"NO"
      // }).then((x) => {
      //   if(x.value){
      //     setTimeout(() => {
      //       me.setState({modal:false});
      //     },300);
      //   }
      // });
    }
    // console.log(this.state.modal);
  }

  removeFile(i){
    console.log('removeFile');
    const fileList = [...this.state.files];
    fileList.splice(i,1);
    this.setState({files:fileList});
  }

// remove All file
  clearFiles(){
    this.setState({files:[]});
  }

// === Cropper ===
// FOR save btn after edit img
  saveCrop(e){
    if(!this.state.cropState){
      e.preventDefault();
      return;
    }

    const {cropResult,files,imgEditIndex} = this.state,
          fDataStore = this.fData.getAll('thumb')[imgEditIndex],
          newFile = Object.assign(fDataStore,{thumb:cropResult}),
          filesCopy = [...files];
    filesCopy.splice(imgEditIndex,1,newFile);

    this.setState(
      {
        modal:false,
        files:filesCopy
        // files:files.concat(newFile)
      },
      () => this.resetCrop()
    );
    // console.log(this.fData.getAll('thumb')[imgEditIndex]);

    // this.setState(state => ({
    //   files:state.files.concat(newFile)
    // }));
  }

// FOR crop img
  cropImage(){
    const me = this;
    let cropData = this.cropper.getCroppedCanvas({
      imageSmoothingEnabled:false,
      imageSmoothingQuality:'high'
    });
    if(typeof cropData === 'undefined') return;

    cropData.toBlob((blob) => {
      // me.fData = new FormData();
      let urlObj = URL.createObjectURL(blob);
      this.setState({
        cropResult:urlObj,
        cropState:true
      });
      // this.tmpFile.push();// DEV OPTION FOR temp file to edit
      me.fData.append('thumb',blob,this.state.imgModal.name);
      console.log(me.fData.getAll('thumb'));

      // OPTION to revokeObjectURL after load img crop result
      // this.refs.imgCropResult.onload = function(){
      //   URL.revokeObjectURL(urlObj);
      // };
      console.log(urlObj);
    });
  }

// FOR reset / undo crop
  resetCrop(){
    this.setState({
      cropResult:null,
      cropState:false
    });
  }

// FOR zoom img edit
  zoomInOut(zoomIn = false){
    // let et = e.target;
    let {zoomImg} = this.state;
    if(zoomIn){
      this.setState({zoomImg:zoomImg + 0.1});// zoomImg + 1
    }else{
      if(zoomImg === 0){
        // et.setAttribute("disabled","disabled");// OPTION
        return;
      }
      this.setState({zoomImg:zoomImg - 0.1});// zoomImg - 1
    }
  }

	onRotate(isRight = false){
    // let et = e.target;
		const {rotateTo} = this.state;
    const setRotate = (rotateTo + 90 * (isRight ? 1 : -1)) % 360;

    this.setState({rotateTo:setRotate});
	}

// Error image crop
  errorImgLoad(){
    console.warn('errorImgLoad');
    this.cancelCropCover();
    Qswal.fire({
      type:"error",
      title:"File is Not image",
      text:"Please insert file jpg, jpeg or png",
      // confirmButtonText:"Try again"
    });
  }

  cancelCropCover(){
    if(this.cropper){
      this.cropper.destroy();
      delete this.cropper;
      this.setState({
        modal:false,
        src:null
      });
    }
  }

// FOR open guide component
  modalGuide(){
    this.setState({guideModal:!this.state.guideModal});
  }

// DEV FOR tags file
  tagsFile(data){ // ,idx
    console.log('tagsFile');
    // this.setState({tagModal:!this.state.tagModal});

    const me = this;
    if(!me.state.tagModal){
      console.log(data);
      me.setState({
        tagModal:true,
        imgTag:data,
        // imgTagIndex:idx // OPTION FOR store img file index to croppper
      },
      () => {
          console.warn('state NOW tag');
          console.log(this.state);
        }
      );
    }else{
      me.setState({
        tagModal:false
      });
    }
  }

  render(){
    const {files, modal, imgModal, imgEditIndex, guideModal, 
            tagModal, imgTag, cropResult, cropState} = this.state;// zoomImg,src
    const {label,id,accept,required} = this.props;

    // form-group 
    return (
      <div className="Qfile">
        {label && <label className="btn btn-primary" role="button" htmlFor={id}>{label}</label>}
        
        <Dropzone 
          accept={accept}// "image/jpeg,image/png"
          onDrop={this.onDrop}
        >
          {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => {
            return (
              <div
                {...getRootProps()}
                className={
                  classNames('dropzone',{'dropzone-on': isDragActive,'dropError': isDragReject})
                }
              >
                <input id={id} {...getInputProps()} required={required} />

                {isDragAccept && "Drop files here..."}
                {isDragReject && <div className="dropErrInfo text-center">Some files is not image!</div>}
                {!isDragActive && "Dropping files here or click to select files."}
              </div>
            )
          }}
        </Dropzone>

        {files.length > 0 &&
          <Fragment>
            <div className="filePrev-box">
              {files.map((f,i) => (
                f.type !== "video/mp4" ?
                <Thumb
                  key={f.name}
                  id={i}
                  modalPrev={() => this.modalPrev(f,i)}
                  removeFile={() => this.removeFile(i)}
                  alt={f.name}
                  src={f.thumb}
                  noop={this.noop}
                />
                :
                <div key={f.name} className="tmb-prev select-no">
                  <Button onClick={() => this.removeFile(i)} size="sm" color="danger" className="mi mi-close scale12" title="Remove" />
                  <video 
                    onContextMenu={this.noop}
                    id={i}
                    type={f.type} 
                    src={f.thumb} 
                    controls 
                    controlsList="nodownload noremoteplayback"
                    playsInline
                    disablepictureinpicture="true"
                    tabIndex="-1"
                  />
                </div>
              ))}
            </div>
            <div className="text-right"><Button onClick={this.clearFiles}>Clear Files</Button></div>
          </Fragment>  
        }

        {imgModal &&
          <Modal 
            centered
            size="lg"
            backdrop="static"
            keyboard={false}
            isOpen={modal} 
            toggle={this.modalPrev} 
            modalClassName="modalFilePrev"
          >
            <ModalHeader toggle={this.modalPrev}>
              {!cropState ?
                <ButtonGroup>
                  {/* <Button onClick={() => this.zoomInOut(true)} outline className="mi mi-magnify-plus scale15" title="Zoom in" />
                  <Button onClick={() => this.zoomInOut()} outline className="mi mi-magnify-minus scale15" title="Zoom out" /> */}
    <Button onClick={this.onRotate} outline className="mi mi-rotate-left scale15" title="Rotate Left" />
    <Button onClick={() => this.onRotate(true)} outline className="mi mi-rotate-right scale15" title="Rotate Right" />
    <Button onClick={this.cropImage} outline className="mi mi-crop scale15" title="Crop" />
                  <UncontrolledButtonDropdown>
                    <DropdownToggle outline caret></DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => this.tagsFile(files[imgEditIndex])}>Tags</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </ButtonGroup>
                :
                <Button onClick={this.resetCrop} outline className="mi mi-undo-variant scale12"> Undo</Button>
              }

            </ModalHeader>
            <ModalBody>
              {cropResult && cropState ?
                <div className="img-edit">
                  <img ref="imgCropResult" alt={imgModal.name} className="img-fluid" src={cropResult} draggable={false} />
                </div>
                :
                <ReactCropper
                  ref={c => {this.cropper = c;}}
                  className="img-edit"
                  // checkOrientation={true}// DEFAULT = true | false
                  aspectRatio={1}// 1, 16 / 9, 21 / 9
                  // dragMode="move"// OPTION
                  //preview=".img-preview"
                  viewMode={1}
                  zoomable={false}// OPTION
                  //crop={console.log('crop')}
                  minCropBoxWidth={120}
                  minCropBoxHeight={120}
                  // zoomTo={zoomImg}// OPTION
                  rotateTo={this.state.rotateTo}

                  // guides={false}
                  src={imgModal.thumb}
                  // ready={this.onErrorImg}
                  //onLoad={this.onLoadCrop}
                  onErrorLoadImg={this.errorImgLoad}
                />
              }

              {/* Modal Guide */}
              <Modal centered isOpen={guideModal} toggle={this.modalGuide}>
                <ModalHeader toggle={this.modalGuide}>Guide</ModalHeader>
                <ModalBody>bla_bla_bla</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.modalGuide}>Close</Button>
                </ModalFooter>
              </Modal>

              {/* Modal tags */}
              <Modal 
                size="lg"
                backdrop="static"
                keyboard={false}
                centered 
                isOpen={tagModal} 
                toggle={this.tagsFile}
                modalClassName="modalFilePrev modalSetImg"
              >
                <ModalHeader toggle={this.tagsFile}>Tags</ModalHeader>
                <ModalBody className="d-flex">
                  <div className="img-edit w-75" style={{height:'75vh'}}>
                    {imgTag && 
                      <Fragment>
                        <div className="tagWrap" style={{width:'889.77px',height:'500'}}>
                          <svg className="svgmap" viewBox="0 0 889 500" width="889.77" height="500" preserveAspectRatio="xMinYMin meet">
                            <a href="/" className="tipTag" id="tag1">
                              <circle className="pulse" cx="94.015625" cy="117.86378479003906" r="10" />
                              <circle cx="94.015625" cy="117.86378479003906" r="8" />
                            </a>

                            <a href="/" className="tipTag" id="tag2">
                              <circle className="pulse" cx="452.53125" cy="389.12332916259766" r="10" />
                              <circle cx="452.53125" cy="389.12332916259766" r="8" />
                            </a>

                            <a href="/" className="tipTag" id="tagRect1">
                              <rect x="710" y="46.123329162597656" width="45" height="49" />
                            </a>
                          </svg>
                        </div>

                        <UncontrolledTooltip autohide={false} placement="auto" target="tag1">
                          Hello world! - tag1
                        </UncontrolledTooltip>
                        <UncontrolledTooltip autohide={false} placement="auto" target="tag2">
                          tag2
                        </UncontrolledTooltip>
                        <UncontrolledTooltip autohide={false} placement="auto" target="tagRect1">
                          tagRect1
                        </UncontrolledTooltip>

                        <img className="w-auto" alt={imgTag.name} src={imgTag.thumb} draggable="false" />
                      </Fragment>
                    }
                  </div>

                  <div className="w-25 bg-light">
                    panel edit
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={this.tagsFile}>Close</Button>
                  <Button color="primary" onClick={this.tagsFile}>Save</Button>
                </ModalFooter>
              </Modal>

            </ModalBody>
            <ModalFooter>
              {/* <form className="flex1">
                <input
                  defaultValue={imgModal.name}// value
                  className="form-control"// form-control-plaintext
                  type="text"
                />
              </form> */}
              <Button outline onClick={this.modalGuide} title="Guide edit image">Guide</Button>
              <div>
                <Button onClick={this.modalPrev}>Cancel</Button>{' '}
                <Button color="primary" onClick={this.saveCrop} type="submit" disabled={!cropState}>Save</Button>
              </div>
            </ModalFooter>
          </Modal>
        }
      </div>
    );
  }

}
import React,{Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindMethods} from '../../utils/Qutils';
import classNames from 'classnames';
// import { Formik } from "formik";
// import * as Yup from 'yup';// import yup from "yup";
import Dropzone from "react-dropzone";// import Dropzone from '../../react-dropzone';
import Thumb from './Thumb';

import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,// Progress,Badge,
        CardBody, CardHeader, CardFooter, Collapse} from 'reactstrap';// Card,CardBody,CardHeader,CardFooter,Modal,ModalHeader,ModalBody,ModalFooter

import Qmodal from '../Qmodal';
import ReactCropper from '../crop';
// import Qswal from '../Qswal';
import {BtnGroup, Btn, Qswal} from '../';

// import Qbox from '../Qbox';
import Webcam from '../Webcam';

export default class Qfile extends Component{
  constructor(props){
    super(props)
    this.state = {
      files:[],// FOR store dropzone files
      modal:false,// FOR open modal edit img
      imgModal:null,// FOR store img file to croppper
      imgEditIndex:null,// FOR store img file index to croppper
      guideModal:false,// FOR modal guide edit img

      src:null,
      cropResult:null,
      cropState:false,
      zoomImg:0,
      rotateTo:0,

      cameraOpen:false,
      collapseUrl:false,
      connection:true
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

      'showOptionInput',// OPTION DEV
      'stopPro','onShot','clickShot','toggleUrl','netConnect'
    ]);
  }

  componentDidMount(){
    // const me = this;
    console.log('componentDidMount in Qfile');

    // DEV
    window.addEventListener('online',this.netConnect);
    window.addEventListener('offline',this.netConnect);
  }

  componentWillUnmount(){
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(f => window.URL.revokeObjectURL(f.thumb))
  }

  noop(e){
    e.preventDefault();
  }

// Add files
  onDrop(files){
    if(!this.state.connection){
      return;
    }

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
              modal:false,
              imgModal:null
            });
            this.resetCrop();
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
    this.fData.delete('thumb');
    // console.log(this.fData.getAll('thumb'));
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
      let urlObj = URL.createObjectURL(blob);
      this.setState({
        cropResult:urlObj,
        cropState:true
      });

      me.fData.append('thumb',blob,this.state.imgModal.name);
      console.log(me.fData.getAll('thumb'));

      // OPTION to revokeObjectURL after load img crop result
      // this.refs.imgCropResult.onload = function(){
      //   URL.revokeObjectURL(urlObj);
      // };
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

// OPTION DEV
  showOptionInput(state){
    this.setState({[state]:!this.state[state]});
  }

  stopPro(e){
    e.stopPropagation();
  }

  onShot(){
    this.setState({cameraOpen:!this.state.cameraOpen});
  }

// Q-CUSTOM handle screenshot
  clickShot(){
    const me = this;
    // if(!me.state.isShot){
      let screenshot = me.refs.webcam.getScreenshot();
      let filesLength = me.state.files.length;
      let fDataLength = me.fData.getAll('thumb').length;

      screenshot.then((blob) => {
        // console.log('screenshot.blob',blob);
        me.fData.append('thumb',blob,"capture.png");

        let shotToForm = me.fData.getAll('thumb')[fDataLength],
            shotFile = Object.assign(shotToForm,{thumb: URL.createObjectURL(blob)}),
            filesCopy = [...me.state.files];

        filesCopy.splice(filesLength,1,shotFile);

        console.log('filesCopy',filesCopy);

        this.setState(
          {cameraOpen:false},
          () => this.setState({files:filesCopy})
        );
      },(err) => {
        console.log(err)
      });
    // }
  }

  toggleUrl(){
    this.setState({collapseUrl:!this.state.collapseUrl});
  }

  netConnect(e){
    // let condition = navigator.onLine ? "online" : "offline";
    this.setState({connection:navigator.onLine});
    // console.log("beforeend", "Event: " + e.type + "; Status: " + condition);
    if(!navigator.onLine){
      e.preventDefault();
      return;
    }
  }

  render(){
    const {files, modal, imgModal, guideModal,
          cropResult, cropState, cameraOpen, connection} = this.state;// imgEditIndex, tagModal, imgTag
    const {label, id, accept, required, responsive, ratio, zoom, guide, progressItem} = this.props;

    // form-group
    return (
      <div
        className={
          classNames("card p-3 Qfile",{
            "offline" : !connection
          })
        }
        title={connection ? null : "OFFLINE"}
      >
        {label && <p><label className="btn btn-primary" role="button" htmlFor={id}>{label}</label></p>}

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
                {connection &&
                  <input id={id} {...getInputProps()} required={required} />
                }

                {isDragAccept && <div className="i q-folder-open"> Drop files here...</div>}
                {isDragReject && <div className="dropErrInfo text-center">Some files is not image!</div>}
                {!isDragActive && <div className="i q-folder-open"> Dropping files here or click to select files</div>}

                <div className="btn-group btn-group-app bg-white mt-5" onClick={this.stopPro}>
                  {/* <Btn outline className="mi mi-folder-open scale15">Folder</Btn> */}
                  <Btn onClick={this.onShot} outline className="i q-camera scale12">Camera</Btn>
                  <label htmlFor="inputFocus" onClick={this.toggleUrl} className="btn btn-outline-secondary i q-link-variant scale12" role="button">Link</label>{/* () => this.showOptionInput("inputUrl") */}
                  <Btn outline className="i q-instagram scale12">Instagram</Btn>
                  <Btn outline className="i q-google-drive scale12">Google Drive</Btn>
                </div>
              </div>
            )
          }}
        </Dropzone>

        <Qmodal
          size="lg"// "fw" | "page"
          drop="static"
          keyboard={false}
          center
          open={cameraOpen}
          toggle={this.onShot}
          modalClass="modalFilePrev"
          // headClass="QheadModal"
          head="Capture"
          body={
            <div className="bg-111">
              <Webcam
                ref="webcam"
                // elClass="img-edit"
                imgClass="d-block"
              />
            </div>
          }

          // footClass="justify-content-center"
          foot={
            <Fragment>
              <Btn outline onClick={this.modalGuide} title="Guide edit image">Guide</Btn>
              <Btn outline onClick={this.clickShot} className="i q-camera scale12"> Capture</Btn>
            </Fragment>
          }

          // opened={() => console.log(this.state.files)}
          // closed={() => console.log(this.state.files)}
        />

          <Collapse
            // elClass="option-input"
            className="card option-input"
            isOpen={this.state.collapseUrl}
            // data-anime={false}
          >
            <Fragment>
              <CardHeader>Import from Url </CardHeader>
              <CardBody className="text-center">
                <p>Insert url here</p>
                <input id="inputFocus" className="form-control" type="url" />{/*  */}
              </CardBody>
              <CardFooter className="text-center">
                <Btn outline onClick={this.toggleUrl}>Cancel</Btn>{' '}{/* () => this.showOptionInput("inputUrl") */}
                <Btn color="primary">Import</Btn>
              </CardFooter>
            </Fragment>
          </Collapse>

        {files.length > 0 &&
          <Fragment>
            <div className="filePrev-box">
              {files.map((f,i) => (
                <Thumb
                  key={f.name + i}
                  id={f.name + i}
                  modalPrev={() => this.modalPrev(f,i)}
                  removeFile={() => this.removeFile(i)}// () => this.removeFile(i)
                  alt={f.name}
                  src={f.thumb}
                  type={f.type}
                  progressItem={progressItem}
                  noop={this.noop}
                />
              ))}
            </div>
            <div className="text-right"><Btn onClick={this.clearFiles}>Clear Files</Btn></div>
          </Fragment>
        }

        {/* Modal Guide */}
        <Qmodal
          center
          open={guideModal}
          toggle={this.modalGuide}
          head="Guide"
          body={"bla_bla_bla"}
          foot={<Btn color="primary" onClick={this.modalGuide}>Close</Btn>}
        />

        {imgModal &&
          <Qmodal
            size="lg"// "fw" | "page"
            drop="static"
            keyboard={false}
            center
            open={modal}
            toggle={this.modalPrev}
            modalClass="modalFilePrev"
            headClass="QheadModal"
            head={
              !cropState ?
                <BtnGroup>
                {/* <Button onClick={() => this.zoomInOut(true)} outline className="mi mi-magnify-plus scale15" title="Zoom in" />
                <Button onClick={() => this.zoomInOut()} outline className="mi mi-magnify-minus scale15" title="Zoom out" /> */}
  <Btn onClick={this.onRotate} outline className="i q-rotate-left scale12" title="Rotate Left" />
  <Btn onClick={() => this.onRotate(true)} outline className="i q-rotate-right scale12" title="Rotate Right" />
  <Btn onClick={this.cropImage} outline className="i q-crop scale12" title="Crop" />
                <UncontrolledButtonDropdown>
                  <DropdownToggle outline caret></DropdownToggle>
                  <DropdownMenu>
                    {/*  onClick={() => this.tagsFile(files[imgEditIndex])} */}
                    <DropdownItem>Tags</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </BtnGroup>
              :
              <Btn onClick={this.resetCrop} outline className="i q-undo-variant scale12"> Undo</Btn>
            }

            body={
              <Fragment>
                {cropResult && cropState ?
                  <div className="img-edit">
                    {/*  OPTION FOR revokeObjUrl = ref="imgCropResult" */}
                    <img alt={imgModal.name} className="img-fluid" src={cropResult} draggable={false} />
                  </div>
                  :
                  <ReactCropper
                    ref={c => {this.cropper = c;}}
                    className="img-edit"

										// Re-render the cropper when resize the window
										responsive={responsive} // Type: Boolean, Default: true

                    // checkOrientation={true}// DEFAULT = true | false

										// Define the fixed aspect ratio of the crop box. By default, the crop box is free ratio.
										// Type: Number, Default: NaN, OPTION: 1, 16 / 9, 21 / 9
										aspectRatio={ratio}

										// Define the dragging mode of the cropper
										// Options: 'crop': create a new crop box
														 // 'move': move the canvas
														 // 'none': do nothing
                    // dragMode="move"// Default: 'crop' OPTION

                    viewMode={1}//

										// Enable to zoom the image
                    zoomable={zoom}// Type: Boolean, Default: true

                    //crop={console.log('crop')}

										// The minimum width of the crop box. Note: This size is relative to the page, not the image
                    minCropBoxWidth={120}// Type: Number, Default: 0

										// The minimum height of the crop box. Note: This size is relative to the page, not the image
                    minCropBoxHeight={120}// Type: Number, Default: 0

                    // zoomTo={zoomImg}// OPTION

                    rotateTo={this.state.rotateTo}

										// Show the dashed lines above the crop box
                    guides={guide}// Type: Boolean, Default: true

                    src={imgModal.thumb}
                    // ready={this.onErrorImg}
                    //onLoad={this.onLoadCrop}
                    onErrorLoadImg={this.errorImgLoad}
                  />
                }
              </Fragment>
            }

            foot={<Fragment>
              <Btn outline onClick={this.modalGuide} title="Guide edit image">Guide</Btn>
              <div>
                <Btn onClick={this.modalPrev}>Cancel</Btn>{' '}
                <Btn color="primary" onClick={this.saveCrop} type="submit" disabled={!cropState}>Save</Btn>
              </div>
            </Fragment>}
          />
        }
      </div>
    );
  }

}

// label,id,accept,required,
Qfile.propTypes = {
  label: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  required: PropTypes.bool,
  propgressItem: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ])
};

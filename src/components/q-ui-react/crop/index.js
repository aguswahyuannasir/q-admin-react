import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';

const optionProps = [
  'dragMode','aspectRatio','data','crop',
  // unchangeable props start from here
  'viewMode',
  'preview',
  'responsive',
  'restore',
  'checkCrossOrigin',
  'checkOrientation',
  'modal',
  'guides',
  'center',
  'highlight',
  'background',
  'autoCrop',
  'autoCropArea',
  'movable',
  'rotatable',
  'scalable',
  'zoomable',
  'zoomOnTouch',
  'zoomOnWheel',
  'wheelZoomRation',
  'cropBoxMovable',
  'cropBoxResizable',
  'toggleDragModeOnDblclick',
  'minContainerWidth',
  'minContainerHeight',
  'minCanvasWidth',
  'minCanvasHeight',
  'minCropBoxWidth',
  'minCropBoxHeight',
  'ready',
  'cropstart',
  'cropmove',
  'cropend',
  'zoom'
];

const unchangeableProps = optionProps.slice(4);

export default class ReactCropper extends Component{

  componentDidMount(){
    const options = Object.keys(this.props)
    .filter(propKey => optionProps.indexOf(propKey) !== -1)
    .reduce((prevOptions, propKey) =>
      Object.assign({},prevOptions,{[propKey]:this.props[propKey]})
    ,{});
    this.cropper = new Cropper(this.img,options);
  }

  shouldComponentUpdate(nextProps){ // componentWillReceiveProps
    if(nextProps.src !== this.props.src){
      this.cropper.reset().clear().replace(nextProps.src);
    }
    if(nextProps.aspectRatio !== this.props.aspectRatio){
      this.setAspectRatio(nextProps.aspectRatio);
    }
    if(nextProps.data !== this.props.data){
      this.setData(nextProps.data);
    }
    if(nextProps.dragMode !== this.props.dragMode){
      this.setDragMode(nextProps.dragMode);
    }
    if(nextProps.cropBoxData !== this.props.cropBoxData){
      this.setCropBoxData(nextProps.cropBoxData);
    }
    if(nextProps.canvasData !== this.props.canvasData){
      this.setCanvasData(nextProps.canvasData);
    }
    if(nextProps.moveTo !== this.props.moveTo){
      if(nextProps.moveTo.length > 1){
        this.moveTo(nextProps.moveTo[0],nextProps.moveTo[1]);
      }else{
        this.moveTo(nextProps.moveTo[0]);
      }
    }
    if(nextProps.zoomTo !== this.props.zoomTo){
      this.zoomTo(nextProps.zoomTo);
    }
    if(nextProps.rotateTo !== this.props.rotateTo){
      this.rotateTo(nextProps.rotateTo);
    }
    if(nextProps.scaleX !== this.props.scaleX){
      this.scaleX(nextProps.scaleX);
    }
    if(nextProps.scaleY !== this.props.scaleY){
      this.scaleY(nextProps.scaleY);
    }
    if(nextProps.enable !== this.props.enable){
      if(nextProps.enable){
        this.enable();
      }else{
        this.disable();
      }
    }

    Object.keys(nextProps).forEach((propKey) => {
      let isDifferentVal = nextProps[propKey] !== this.props[propKey];
      const isUnchangeableProps = unchangeableProps.indexOf(propKey) !== -1;

      if(typeof nextProps[propKey] === 'function' && typeof this.props[propKey] === 'function'){
        isDifferentVal = nextProps[propKey].toString() !== this.props[propKey].toString();
      }
      if(isDifferentVal && isUnchangeableProps){
        throw new Error(`prop: ${propKey} can't be change after componentDidMount`);
      }
    });

    return true;
  }

  componentWillUnmount(){
    if(this.img){
      // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
      this.cropper.destroy();
      delete this.img;
      delete this.cropper;
    }
  }

// Q-CUSTOM
  destroy(){
    return this.cropper.destroy();
  }

  setDragMode(mode){
    return this.cropper.setDragMode(mode);
  }

  setAspectRatio(aspectRatio){
    return this.cropper.setAspectRatio(aspectRatio);
  }

  getCroppedCanvas(options){
    return this.cropper.getCroppedCanvas(options);
  }

  setCropBoxData(data){
    return this.cropper.setCropBoxData(data);
  }

  getCropBoxData(){
    return this.cropper.getCropBoxData();
  }

  setCanvasData(data){
    return this.cropper.setCanvasData(data);
  }

  getCanvasData(){
    return this.cropper.getCanvasData();
  }

  getImageData(){
    return this.cropper.getImageData();
  }

  getContainerData(){
    return this.cropper.getContainerData();
  }

  setData(data){
    return this.cropper.setData(data);
  }

  getData(rounded){
    return this.cropper.getData(rounded);
  }

  crop(){
    return this.cropper.crop();
  }

  move(offsetX,offsetY){
    return this.cropper.move(offsetX,offsetY);
  }

  moveTo(x,y){
    return this.cropper.moveTo(x,y);
  }

  zoom(ratio){
    return this.cropper.zoom(ratio);
  }

  zoomTo(ratio){
    return this.cropper.zoomTo(ratio);
  }

  rotate(degree){
    return this.cropper.rotate(degree);
  }

  rotateTo(degree){
    return this.cropper.rotateTo(degree);
  }

  enable(){
    return this.cropper.enable();
  }

  disable(){
    return this.cropper.disable();
  }

  reset(){
    return this.cropper.reset();
  }

  clear(){
    return this.cropper.clear();
  }

  replace(url,onlyColorChanged){
    return this.cropper.replace(url,onlyColorChanged);
  }

  scale(scaleX,scaleY){
    return this.cropper.scale(scaleX,scaleY);
  }

  scaleX(scaleX){
    return this.cropper.scaleX(scaleX);
  }

  scaleY(scaleY){
    return this.cropper.scaleY(scaleY);
  }

  render(){
    const {src, alt, crossOrigin, style, className, onErrorLoadImg} = this.props;

    return (
      <div
        src={null}
        crossOrigin={null}
        alt={null}
        style={style}
        className={className}
      >
        <img
          crossOrigin={crossOrigin}
          ref={(img) => {this.img = img;}}
          src={src}
          alt={alt === undefined ? 'image for crop' : alt}
          onError={onErrorLoadImg}// Q-CUSTOM FOR error load img to crop
        />
      </div>
    );
  }
}

ReactCropper.defaultProps = {
  src:null,
  dragMode:'crop',
  data:null,
  scaleX:1,
  scaleY:1,
  enable:true,
  zoomTo:1,
  rotateTo:0
};

const proNum = PropTypes.number,
			proStr = PropTypes.string,
			proBool = PropTypes.bool,
			proFunc = PropTypes.func;

ReactCropper.propTypes = {
  style: PropTypes.object,// eslint-disable-line react/forbid-prop-types
  className: proStr,

  crossOrigin: proStr,// react cropper options
  src: proStr,
  alt: proStr,

  onErrorLoadImg: proFunc,// Q-CUSTOM FOR error load img to crop

  // props of option can be changed after componentDidmount
  aspectRatio: proNum,
  dragMode: PropTypes.oneOf(['crop','move','none']),
  data: PropTypes.shape({
    x: proNum,
    y: proNum,
    width: proNum,
    height: proNum,
    rotate: proNum,
    scaleX: proNum,
    scaleY: proNum,
  }),
  scaleX: proNum,
  scaleY: proNum,
  enable: proBool,
  cropBoxData: PropTypes.shape({
    left: proNum,
    top: proNum,
    width: proNum,
    height: proNum,
  }),
  canvasData: PropTypes.shape({
    left: proNum,
    top: proNum,
    width: proNum,
    height: proNum,
  }),
  zoomTo: proNum,
  moveTo: PropTypes.arrayOf(proNum),
  rotateTo: proNum,

  // cropperjs options
  // https://github.com/fengyuanchen/cropperjs#options
  // aspectRatio, dragMode, data
  viewMode: PropTypes.oneOf([0,1,2,3]),
  preview: proStr,
  responsive: proBool,
  restore: proBool,
  checkCrossOrigin: proBool,
  checkOrientation: proBool,
  modal: proBool,
  guides: proBool,
  center: proBool,
  highlight: proBool,
  background: proBool,
  autoCrop: proBool,
  autoCropArea: proNum,
  movable: proBool,
  rotatable: proBool,
  scalable: proBool,
  zoomable: proBool,
  zoomOnTouch: proBool,
  zoomOnWheel: proBool,
  wheelZoomRation: proNum,
  cropBoxMovable: proBool,
  cropBoxResizable: proBool,
  toggleDragModeOnDblclick: proBool,
  minContainerWidth: proNum,
  minContainerHeight: proNum,
  minCanvasWidth: proNum,
  minCanvasHeight: proNum,
  minCropBoxWidth: proNum,
  minCropBoxHeight: proNum,
  ready: proFunc,
  cropstart: proFunc,
  cropmove: proFunc,
  cropend: proFunc,
  crop: proFunc,
  zoom: proFunc
};

// export default Qcrop;

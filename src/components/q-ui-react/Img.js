import React from 'react';
import {string, bool, number, func, object, oneOfType} from 'prop-types';// PropTypes
import Cls from 'classnames';

export default class Img extends React.Component{
  constructor(props){
    super(props);
		this.onError = this.onError.bind(this);
		this.onLoad = this.onLoad.bind(this);
  }

	onError(e){
		const {onError, alt} = this.props;
		
		if(onError){
			onError(e);
		}else{
			//let et = e.target;
			// console.warn('onError FROM Img class');
			//if(et.classList.contains("img-fluid")){
			//	et.classList.add("img-fluid");
			//}
			
			// data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid slice' style='text-anchor:middle'%3E%3Crect width='100%25' height='100%25' fill='%23868e96'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' fill='%23fff' dy='.3em' style='font-family:sans-serif'%3E${this.props.alt}%3C/text%3E%3C/svg%3E
			e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid slice' focusable='false' style='text-anchor:middle'%3E%3Crect width='100%25' height='100%25' fill='%23868e96'%3E%3C/rect%3E%3Ctext x='50%25' y='45%25' fill='%23fff' dy='.3em' style='font-family:sans-serif'%3E${alt}%3C/text%3E%3Ctext x='50%25' y='55%25' fill='%23fff' dy='.5em' style='font-size:0.7rem;font-family:sans-serif'%3EImage not found%3C/text%3E%3C/svg%3E`;// "/img/imgError.svg";
			return null;// FROM MDN https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
		}
	}

	onLoad(e){
		const {onLoad} = this.props;
		if(onLoad){
			onLoad(e);
		}
	}

	/*noop = e => {
		//console.log('onDragStart');
		//console.log(e.nativeEvent);
		e.preventDefault();
		e.stopPropagation();
		return;
	}*/

	img(){
		const {inRef, alt, w, h, src, fluid, thumb, circle, round, imgClass, noDrag, style} = this.props;
		
		return (
			<img
				ref={inRef} 
				alt={alt} 
				width={w} 
				height={h} 
				src={src} 
				className={
					Cls({
						'img-fluid': fluid,
						'img-thumbnail': thumb,
						'rounded-circle': circle,
						'rounded': round
					},imgClass)
				} 
				draggable={noDrag ? false : null} 
				style={style} 
				onError={this.onError} 
				onLoad={this.onLoad} 
				//onDrag={this.noop} 
				// {...attr}
			/>
		)
	}

	render(){
		//const {frame} = this.props;

		if(this.props.frame){
			return (
				<div className="img-frame" draggable="false">
					{this.img()}
				</div>
			)
		}else{
			return this.img();
		}
	}
}

Img.defaultProps = {
  noDrag: true
};

const strNum = oneOfType([
	string, number
]);

Img.propTypes = {
	frame: bool,
  inRef: oneOfType([
    object,
    func,
    string
  ]),
  alt: string,
	
  w: strNum,
  h: strNum,
	src: string.isRequired,
	
  fluid: bool,
  thumb: bool,
  circle: bool,
  round: bool,
  imgClass: string,
  noDrag: bool,
	onError: func,
	onLoad: func
};

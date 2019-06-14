import React from 'react';
import {string, bool, number, func, object, oneOfType} from 'prop-types';// PropTypes
import Cls from 'classnames';

export default class Img extends React.Component{
  /*constructor(props){
    super(props);
    this.onError = this.onError.bind(this);
  }*/

	onError = e => {
		if(this.props.onError){
			this.props.onError(e);
		}else{
			let et = e.target;
			// console.warn('onError FROM Img class');
			if(et.classList.contains("img-fluid")){
				et.classList.add("img-fluid");
			}
			et.src = "/img/imgError.svg";
		}
	}

	render(){
		const {innerRef, alt, w, h, fluid, thumb, circle, round, imgClass, noDrag, ...attr} = this.props;

		return (
			<img
				ref={innerRef}
				alt={alt}
				width={w}
				height={h}
				className={
					Cls({
						'img-fluid': fluid,
						'img-thumbnail': thumb,
						'rounded-circle': circle,
						'rounded': round
					},imgClass)
				}
				draggable={noDrag ? false : null}
				onError={this.onError}
				{...attr}
			/>
		);
	}
}

// Img.defaultProps = {
//   noDrag:"false"
// };

const strNum = oneOfType([
				string,
				number
			]);

Img.propTypes = {
  innerRef: oneOfType([
    object,
    func,
    string
  ]),
  alt: string,
	
  w: strNum,
  h: strNum,
	
  fluid: bool,
  thumb: bool,
  circle: bool,
  round: bool,
  imgClass: string,
  noDrag: bool
};

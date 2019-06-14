import React from 'react';
import {string, number, oneOfType} from 'prop-types';// PropTypes
//import Cls from 'classnames';

export default function ImgHolder({elClass, w, h, label, title, fillRect, fillText, text, textSize}){
	return (
		<svg 
			className={`img-holder${elClass ? ` ${elClass}` : ''}`} // //Cls("img-holder",elClass)
			width={w} // "100%"
			height={h} // "180" 
			preserveAspectRatio="xMidYMid slice" 
			focusable="false" 
			role="img" 
			aria-label={label}
		>
			{title && <title>{title}</title>}
			<rect 
				width="100%" 
				height="100%" 
				fill={fillRect} // #868e96 "red" 
			/>
			<text 
				x="50%" 
				y="50%" 
				fill={fillText} // "#dee2e6" 
				dy=".3em"
				//textLength="300"
				//lengthAdjust="spacingAndGlyphs" // spacing
				className={textSize}
			>
				{text}
			</text>
		</svg>
	);
}

const strNum = oneOfType([
	string, number
]);

ImgHolder.defaultProps = {
  fillRect: "#868e96",
	fillText: "#fff"
};

ImgHolder.propTypes = {
	elClass: string, 
	w: strNum, 
	h: strNum, 
	label: string, 
	title: string, 
	fillRect: string, 
	fillText: string, 
	text: string
};






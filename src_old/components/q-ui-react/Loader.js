import React from 'react';
import Cls from 'classnames';

export default function Loader({isLoad, bg, fix, full, stroke, sw, fill, elClass, id, label, tip, tab, w, h, circleClass}){ // props
	const bgIco = bg ? {backgroundImage:`url(${bg})`} : null;

	return (
		<React.Fragment>
			{isLoad && 
				<div
					className={				
						Cls("load-spin",{
							"fix" : fix,
							"withFill" : fill,
							"withStroke" : stroke,
							"full-wh" : full
						}, elClass)
					}
					id={id}
					style={bgIco}
					role="progressbar"
					aria-hidden
					aria-label={label ? label : tip} // label ? label : txt
					title={tip} // tip ? tip : `${txt}...`
					tabIndex={tab} // tab ? tab : "-1", "-1" | "0"
				>
					<svg
						className="svg-spin"
						width={w}
						height={h}
						viewBox="0 0 44 44"
					>
						<circle 
							className={circleClass}
							fill={fill} 
							cx="22" 
							cy="22" 
							r="20" 
							stroke={stroke}
							strokeWidth={sw} 
						/>
					</svg>
				</div>
			}
		</React.Fragment>
	);
}

Loader.defaultProps = {
	isLoad: true,
	w: 86,
	h: 86,
	sw: 4,
	tip: "Loading...",
	tab: "-1"
};

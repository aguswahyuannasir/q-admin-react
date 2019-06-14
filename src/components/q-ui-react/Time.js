import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Time(props){
	let {elClass, sm, ico, dt, tip, ...attr} = props;// children
	
	return (
		<time
			className={
				classNames({
					'mi mi-clock-outline': ico,
					'small': sm
				},elClass)
			}
			dateTime={dt}
			title={tip}
			{...attr}
		/>
	);
}

const propStr = PropTypes.string,
			propBool = PropTypes.bool;

Time.propTypes = {
	elClass: propStr,
	sm: propBool,
	ico: propBool,
	dt: propStr,
	tip: propStr
};
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {mapToCssModules} from './utils';

export default function Flex(props){
	let {
		tag:Tag,
		dir,
		wrap,
		row,
		col,
		justify,
		align,
		// direction,
		className,
		cssModule,
		...attr
	} = props;// children, dt, tip

	// const direction = `flex-${outline ? 'outline' : ''}-${color}`;

	const flexWrap = wrap && wrap !== "no" ? `flex-wrap` : wrap === "no" ? `flex-nowrap` : false; 

	// wrap === "no" ? `flex-${wrap}wrap` : `flex-${wrap}` : false;
	
    const classes = mapToCssModules(classNames(
		// {dir},
		dir === "inline" ? 'd-inline-flex' : 'd-flex',
		flexWrap,
		// wrap ? 'flex-wrap' : false,
		// nowrap ? 'flex-nowrap' : false,

		row ? 'flex-row' : false,
		col ? 'flex-column' : false,
		justify ? `justify-content-${justify}` : false,
		align ? `align-items-${align}` : false,
		className
		// direction ? `flex-${direction}` : false,
		// block ? 'btn-block' : false,
	),cssModule);

	return (
		<Tag
			className={classes}
			{...attr}
		/>
	);
}

Flex.defaultProps = {
	// flex:'d-flex',
	// wrap:'wrap',
	tag:'div'
};

Flex.propTypes = {
	tag: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string
	]),
	dir: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string
	]),
	// justify: PropTypes.string,// NOT FIX
	justify: PropTypes.oneOf(['start','end','center','between','around', 'even','stretch']),
	align: PropTypes.oneOf(['start','end','center','baseline','stretch']),
	className: PropTypes.string,
	cssModule: PropTypes.object,
	// dt: PropTypes.string,
	// tip: PropTypes.string,
  // children: PropTypes.any,// node
};

// BEFORE
/*
<time
	className={`${timeClass ? `${timeClass} ` : ""}${ico ? "mi mi-clock-outline " : ""}`}
	dateTime={dt}
	title={tip}
	{...attr}
>
	{children}
</time>
*/
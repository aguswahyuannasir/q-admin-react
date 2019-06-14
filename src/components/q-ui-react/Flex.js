import React from 'react';
import {func, string, object, oneOf, oneOfType} from 'prop-types';// PropTypes
import Cls from 'classnames';
import {mapToCssModules} from './utils';

export default function Flex({as:As, type, dir, wrap, row, col, justify, align, elClass, cssModule, ...attr}){
	//let {tag:Tag, type, dir, wrap, row, col, justify, align, elClass, cssModule, ...attr} = props;

	const flexWrap = wrap && wrap !== "no" ? `flex-wrap` : wrap === "no" ? `flex-nowrap` : false; 
	
  const classes = mapToCssModules(Cls(
		type === "inline" ? 'd-inline-flex' : 'd-flex',
		flexWrap,
		dir ? `flex-${dir}` : false,
		justify ? `justify-content-${justify}` : false,
		align ? `align-items-${align}` : false,
		elClass
	),cssModule);

	return (
		<As className={classes} {...attr} />
	);
}

Flex.defaultProps = {
	as: 'div'
};

Flex.propTypes = {
	as: oneOfType([
		func,
		string
	]),
	type: string,
	dir: oneOf([
		'row', 'row-reverse', 'column', 'column-reverse'
	]),
	justify: oneOf(['start', 'end', 'center', 'between', 'around', 'even', 'stretch']),
	align: oneOf(['start', 'end', 'center', 'baseline', 'stretch']),
	elClass: string,
	cssModule: object
};

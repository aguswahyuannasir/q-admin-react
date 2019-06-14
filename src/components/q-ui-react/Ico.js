import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import {mapToCssModules} from './utils';

export default function Ico(props){
  let {
		i,// ico
		size,
		scale,
    elClass,
    innerRef,
    tag:Tag,
    ...attr
  } = props;
	
	//const icoSize = size ? `mi-${size}px` : false;

  return (
    <Tag 
			className={
				classNames({
					[`i q-${i}`]: i,// ico
					[`q-${size}`]: size,
					[`scale${scale}`]: scale
				},elClass)
			}
			
			ref={innerRef}
			{...attr} 
		/>
  );
};

const proStr = PropTypes.string,
			proFunc = PropTypes.func;

Ico.propTypes = {
  tag: PropTypes.oneOfType([
		proFunc,
		proStr
	]),
	size: PropTypes.oneOf(['18','24','36','48']),
	scale: PropTypes.oneOf(['12','15']),
	ico: proStr,// ico
  innerRef: PropTypes.oneOfType([
		PropTypes.object,
		proFunc,
		proStr
	]),
  elClass: proStr
};

Ico.defaultProps = {
  tag:'i'
};

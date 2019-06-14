import React from 'react';
import PropTypes from 'prop-types';
import Cls from 'classnames';
import {mapToCssModules, tagPropType} from './utils';

export default function BtnTool(props){
  const {
    className,
    cssModule,
    as: As,
    ...attr
  } = props;

  const classes = mapToCssModules(Cls(
    'btn-toolbar',
		className
  ),cssModule);

  return (
    <As {...attr} className={classes} />
  );
}

const propStr = PropTypes.string;

BtnTool.propTypes  = {
  as: tagPropType,
  'aria-label': propStr,
  className: propStr,
  cssModule: PropTypes.object,
  role: propStr
};

BtnTool.defaultProps = {
  as: 'div',
  role: 'toolbar'
};

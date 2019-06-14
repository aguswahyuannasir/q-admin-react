import React from 'react';
import {string, object, bool} from 'prop-types';// PropTypes
import Cls from 'classnames';
import {mapToCssModules, tagPropType} from './utils';

export default function BtnGroup({className, cssModule, size, v, as: As, ...attr}){
  const classes = mapToCssModules(Cls(
		v ? 'btn-group-vertical' : 'btn-group',
    size ? 'btn-group-' + size : false,
    className
  ),cssModule);

  return (
    <As className={classes} {...attr} />
  );
}

BtnGroup.propTypes = {
  as: tagPropType,
  'aria-label': string,
  className: string,
  cssModule: object,
  role: string,
  size: string,
  v: bool
};

BtnGroup.defaultProps = {
  as: 'div',
  role: 'group'
};

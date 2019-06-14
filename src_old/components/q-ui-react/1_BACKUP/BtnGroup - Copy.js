import React from 'react';
import {string, object, bool} from 'prop-types';// PropTypes
import Cls from 'classnames';
import {mapToCssModules, tagPropType} from './utils';

export default function BtnGroup(props){
  const {
		className, 
		cssModule, 
		size, 
		v,
    tag: Tag, 
		...attr
  } = props;

  const classes = mapToCssModules(Cls(
		v ? 'btn-group-vertical' : 'btn-group',
    size ? 'btn-group-' + size : false,
    className
  ),cssModule);

  return (
    <Tag {...attr} className={classes} />
  );
}

BtnGroup.propTypes = {
  tag: tagPropType,
  'aria-label': string,
  className: string,
  cssModule: object,
  role: string,
  size: string,
  v: bool
};

BtnGroup.defaultProps = {
  tag: 'div',
  role: 'group'
};

import React from 'react';
import P from 'prop-types';// PropTypes
import Cls from 'classnames';
import {mapToCssModules, tagPropType} from './utils';

export default function Badge({className, cssModule, kind, elRef, pill, as: As, ...attr}){
  const setCls = mapToCssModules(Cls(
    'badge',
    'badge-' + kind,
    pill ? 'badge-pill' : false,
		className
  ), cssModule);

  if(attr.href && As === 'span'){
    As = 'a';
  }

  return (
    <As ref={elRef} className={setCls} {...attr} />
  );
};

Badge.propTypes = {
  kind: P.string,
  pill: P.bool,
  as: tagPropType,
  elRef: P.oneOfType([P.object, P.func, P.string]),
  children: P.node,
  className: P.string,
  cssModule: P.object
};

Badge.defaultProps = {
	as: 'span',
  kind: 'secondary',
  pill: false
};

// export default Badge;
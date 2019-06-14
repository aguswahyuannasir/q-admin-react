import React from 'react';
import {string, bool, object, func, node, oneOfType} from 'prop-types';// PropTypes
import Cls from 'classnames';
import {mapToCssModules,tagPropType} from './utils';

export default class Btn extends React.Component{
  constructor(props){
    super(props);
    /*this.state = {
      spinLoad:false
    };*/
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    const {disabled, onClick} = this.props;// , ...attr

    if(disabled){
      e.preventDefault();
      return;
    }
    if(onClick){
      onClick(e);
    }
  }

  render(){
    //const {spinLoad} = this.state;

    let {
      active,
      'aria-label':ariaLabel,
      block,
      className,
      close,
      cssModule,
      color,
      outline,
      size,
      tag:Tag,
      innerRef,

      type, role, tip,// Q-CUSTOM | spin

      ...attr
    } = this.props;

    if(close && typeof attr.children === 'undefined'){
      attr.children = <i aria-hidden>×</i>;
    }

    const btnOutlineColor = `btn${outline ? '-outline' : ''}-${color}`;

    const classes = mapToCssModules(Cls(
      {close},
      close || 'btn',
      close || btnOutlineColor,
      size ? `btn-${size}` : false,
      block ? 'btn-block' : false,
      {active,disabled: this.props.disabled},
      className,
    ),cssModule);

    if(attr.href && Tag === 'button'){
      Tag = 'a';
    }

    const defaultAriaLabel = close ? 'Close' : null;

    const noChild = !attr.children || typeof attr.children === 'undefined' ? tip : null;

    return (
      <Tag
        // type={(Tag === 'button' && attr.onClick) ? 'button' : undefined}
        {...attr}
        className={classes}
				type={Tag === 'label' ? null : !type && Tag !== 'a' ? 'button' : type}
				aria-label={ariaLabel || defaultAriaLabel || noChild}
				role={(Tag === 'a' || Tag === 'label') && !type  ? 'button' : undefined}
				tabIndex={Tag === 'label' ? "0" : null}
				title={tip}
        ref={innerRef}
        onClick={this.onClick}
        {...attr}
      />
    );
  }
}

Btn.propTypes = {
  active: bool,
  'aria-label': string,
  block: bool,
  color: string,
  disabled: bool,
  outline: bool,
  /*tag:PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),*/
	tag: tagPropType,
  innerRef: oneOfType([
    object,
    func,
    string
  ]),
  onClick: func,
  size: string,
  children: node,
  className: string,
  cssModule: object,
  close: bool,

  role: string,// Q-CUSTOM
  tip: string
};

Btn.defaultProps = {
  color:'secondary',
  tag:'button'
};

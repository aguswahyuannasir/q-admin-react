import React,{Component} from 'react';
import {string, bool, object, func, node, oneOfType} from 'prop-types';// PropTypes
import Cls from 'classnames';
import {mapToCssModules, tagPropType} from './utils';
import {winOpen} from '../utils/Qutils';

export default class Btn extends Component{
  onClick = e => {
    const {disabled, onClick, open} = this.props;// , ...attr

    if(disabled){
      e.preventDefault();
      return;
    }
		
		if(open){
			//e.preventDefault();
			let url = e.target.getAttribute('data-href');
			winOpen(e, url);
		}
		
    if(onClick){
      onClick(e);
    }
  }

  render(){
    //const {spinLoad} = this.state;
    let {as:As, active, 'aria-label':ariaLabel, block, className, close, cssModule, kind, outline, size, inRef,

      type, role, tip, qtip, open, // Q-CUSTOM | ico, spin

      ...attr
    } = this.props;

    if(close && typeof attr.children === 'undefined'){
      attr.children = <i aria-hidden>×</i>;
    }

    const btnOutlineColor = `btn${outline ? '-outline' : ''}-${kind}`;

    const classes = mapToCssModules(Cls(
      {close},
      close || 'btn',
      close || btnOutlineColor,
      size ? `btn-${size}` : false,
      block ? 'btn-block' : false,
      {active, disabled: this.props.disabled},
			//ico ? `i q-${ico}` : false,
			qtip ? `tip tip${qtip}` : false,
      className,
    ),cssModule);

    if(attr.href && As === 'button'){
      As = 'a';
    }

    const closeAriaLabel = close ? 'Close' : null;
    const noChild = !attr.children || typeof attr.children === 'undefined' ? tip : null;

    return (
      <As
        // type={(As === 'button' && attr.onClick) ? 'button' : undefined}
        {...attr}
				ref={inRef}
        className={classes}
				type={As !== 'button' ? null : !type && As !== 'a' ? 'button' : type} // {As == 'label' ? null : !type && As !== 'a' ? 'button' : type}
				aria-label={ariaLabel || closeAriaLabel || noChild}
				role={(As === 'a' || As === 'label' || As === 'span' || As === 'div') && !type  ? 'button' : undefined}
				tabIndex={As === 'label' ? "0" : null}
				title={qtip ? null : closeAriaLabel ? closeAriaLabel : tip} // title={tip}
        data-href={open}
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
  kind: string,
  disabled: bool,
  outline: bool,
  /*as:PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),*/
	as: tagPropType,
  inRef: oneOfType([
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
  tip: string,
	qtip: string
};

Btn.defaultProps = {
	as: 'button',
  kind: 'secondary'
};

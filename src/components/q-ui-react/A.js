import React,{Component} from 'react';
import {string, bool, object, node, func, oneOfType} from 'prop-types';// PropTypes
import Cls from 'classnames';
import {NavLink, Link} from 'react-router-dom';
import {winOpen} from '../utils/Qutils';

// const anchorRef = React.createRef();

export default class A extends Component{
  constructor(props){
    super(props);
    //this.onClick = this.onClick.bind(this);
		//this.noClick = this.noClick.bind(this);
		
		this.target = null;// DEV
  }
	
// DEV
	componentWillUnmount(){
		if(this.target) this.target.removeEventListener('auxclick',e => this.noClick(e));
	}
	
	onClick = e => {
		let {disabled, dom, open, onClick} = this.props;// href
		let et = e.target;
		
    if(disabled){
      //e.preventDefault();
			
			// DEV
			this.target = et;
			this.target.addEventListener('auxclick',e => this.noClick(e));
      return;
    }
		
    if(dom && et.classList.contains("dropdown-item")){
      document.body.click();
    }
    if(dom && et.classList.contains("active")){
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		
		// FOR open new window browser
		if(open){
			e.preventDefault();
			let url = et.href; // e.target.href || href
			winOpen(e, url);
		}
    if(onClick){
      onClick(e);// custom click to props
    }
	}
	
	noClick = e => {
    if(this.props.disabled){
      e.preventDefault();
			// e.stopPropagation();
      return;
    }
	}
	
	renderA(){
		let {inRef, dom, btn, size, outline, href, aClass, disabled,
				 blank, out, tip, qtip, strict, children, ...attr} = this.props;// ico, open, color
		
		const classes = Cls({
			[`btn${typeof btn === 'string' ? ` btn-${btn}` : ''}`]: btn,
			[`btn-${size}`]: size,
			
			//[`btn${outline ? '-outline' : ''}-${color}`]: color,
			//[`i q-${ico}`]: ico,
			[`tip tip${qtip}`]: qtip,
			'disabled': disabled
		},aClass);// NOT FIX STILL parse class attr in DOM even empty props
		
		const noChild = !children || typeof children === 'undefined' ? tip : null;
		
		if(dom){
			if(dom === "link"){
				return (
					<Link 
						//exact
						to={href} 
						className={classes}
						aria-label={noChild}
						title={qtip ? null : tip} // title={tip}
						tabIndex={disabled ? "-1" : null}
						aria-disabled={disabled ? true : null}
						onClick={this.onClick}
						
						{...attr}
					>
						{children}
					</Link>
				);
			}else{
				return (
					<NavLink 
						exact
						strict={strict}
						to={href} 
						className={classes}// classes
						aria-label={noChild}
						title={qtip ? null : tip} // title={tip}
						tabIndex={disabled ? "-1" : null}
						aria-disabled={disabled ? true : null}
						onClick={this.onClick}
						
						{...attr}
					>
						{children}
					</NavLink>
				);
			}
		}
		else{
			return (
				<a 
					ref={inRef}
					href={href} 
					className={classes}// null
					rel={out ? "noopener noreferrer" : null} 
					target={blank || out ? "_blank" : null} 
					aria-label={noChild}
					title={qtip ? null : tip} // title={tip}
					tabIndex={disabled ? "-1" : null}
					aria-disabled={disabled ? true : null}
					onContextMenu={this.noClick}
					onClick={this.onClick}
					{...attr}
				>
					{children}
				</a>
			);
		}
	}
	
	render(){
		return this.renderA();
	}
}

const boolStr = oneOfType([
	bool,
	string
]);

A.propTypes = {
  inRef: oneOfType([
    object,
    func,
    string
  ]),
	dom: boolStr,
	btn: boolStr,
	size: string,
	
	strict: bool,
	
	//color: string,
	href: oneOfType([
		string,
		object
	]),
	aClass: string,
	// ico: string,
	disabled: bool,
  rel: string,
	target: string,
  tip: string,
	qtip: string,
	blank: bool,
	out: bool,
	open: boolStr,
  children: node
};

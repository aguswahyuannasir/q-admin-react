import React,{Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {NavLink, Link} from 'react-router-dom';// Link

export default class A extends Component{
  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
		this.noClick = this.noClick.bind(this);
  }
	
	onClick(e){
		let {disabled, newWindow, href, onClick} = this.props;
		
    if(disabled){
      e.preventDefault();
			/*e.target.addEventListener('auxclick',(e) => {
				e.preventDefault();
				e.stopPropagation();
			},false);*/
      return;
    }
		
		if(newWindow){
			e.preventDefault();
			let url = e.target.href || href;
			window.open(url,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=400,height=300");
		}
    if(onClick){
      onClick(e);
    }
	}
	
	noClick(e){
    if(this.props.disabled){
      e.preventDefault();
      return;
    }
	}
	
	render(){
		let {dom, btn, size, color, outline, href, aClass, 
				 ico, blank, out, tip, newWindow, children, ...attr} = this.props;
		
		//const elClass = aClass ? aClass : null;
		
		const classes = classNames({
			//"btn": btn,
			// [`btn btn-${btn}`]: btn,
			[`btn${typeof btn === 'string' ? ` btn-${btn}` : ''}`]: btn,
			[`btn-${size}`]: size,
			
			[`btn${outline ? '-outline' : ''}-${color}`]: color,
			[`i q-${ico}`]: ico
		},aClass);// NOT FIX STILL parse class attr in DOM even empty props
		
		const noChild = !children || typeof children === 'undefined' ? tip : null;
		
		const Default = () => {
			return (
				<a 
					href={href} 
					
					className={classes}// null
					
					rel={out ? "noopener noreferrer" : null} 
					target={blank || out ? "_blank" : null} 
					aria-label={noChild}
					title={tip}
					onContextMenu={this.noClick}
					onClick={this.onClick}
					{...attr}
				>
					{children}
				</a>
			);
		}
		
		const LinkDom = () => {
			if(dom === "link"){
				return (
					<Link 
						to={href} 
						
						className={classes}// classes
						aria-label={noChild}
						title={tip}
						{...attr}
					>
						{children}
					</Link>
				);
			}else{
				return (
					<NavLink 
						to={href} 
						
						className={classes}// classes
						aria-label={noChild}
						title={tip}
						{...attr}
					>
						{children}
					</NavLink>
				);
			}
		}
		
		if(dom){
			return <LinkDom />
		}
		else{
			return <Default />
		}
	}
}

const propStr = PropTypes.string,
			propBool = PropTypes.bool;

/*PropTypes.oneOfType([
	PropTypes.bool,
	PropTypes.string,
])*/

A.propTypes = {
	// dom: propBool,
	
	btn: PropTypes.oneOfType([
		propBool,
		propStr
	]),
	size: propStr,
	
	color: propStr,
	href: propStr,
	aClass: propStr,
	ico: propStr,
	
  rel: propStr,
	target: propStr,
  tip: propStr,
	blank: propBool,
	out: propBool,
	newWindow: propBool,
  children: PropTypes.node
};

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'object-assign';

import {showMenu, hideMenu} from './actions';
import {callIfExists, cssClasses} from './helpers';

export default class ContextMenuTrigger extends Component{
	static propTypes = {
		id: PropTypes.string.isRequired,
		children: PropTypes.node.isRequired,
		attributes: PropTypes.object,
		collect: PropTypes.func,
		disable: PropTypes.bool,
		holdToDisplay: PropTypes.number,
		posX: PropTypes.number,
		posY: PropTypes.number,
		renderTag: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.func
		]),
		disableIfShiftIsPressed: PropTypes.bool
	};

	static defaultProps = {
		attributes: {},
		collect(){return null;},
		disable: false,
		holdToDisplay: 1000,
		renderTag: 'div',
		posX: 0,
		posY: 0,
		disableIfShiftIsPressed: false
	};

	touchHandled = false;

	handleMouseDown = e => {
		if(this.props.holdToDisplay >= 0 && e.button === 0){
			e.persist();
			e.stopPropagation();

			this.mouseDownTimeoutId = setTimeout(
				() => this.handleContextClick(e),
				this.props.holdToDisplay
			);
		}
		callIfExists(this.props.attributes.onMouseDown,e);
	}

	handleMouseUp = e => {
		if(e.button === 0){
			clearTimeout(this.mouseDownTimeoutId);
		}
		callIfExists(this.props.attributes.onMouseUp,e);
	}

	handleMouseOut = e => {
		if(e.button === 0){
			clearTimeout(this.mouseDownTimeoutId);
		}
		callIfExists(this.props.attributes.onMouseOut,e);
	}

	handleTouchstart = e => {
		this.touchHandled = false;

		if(this.props.holdToDisplay >= 0){
			e.persist();
			e.stopPropagation();

			this.touchstartTimeoutId = setTimeout(
				() => {
					this.handleContextClick(e);
					this.touchHandled = true;
				},
				this.props.holdToDisplay
			);
		}
		callIfExists(this.props.attributes.onTouchStart,e);
	}

	handleTouchEnd = e => {
		if(this.touchHandled){
			e.preventDefault();
		}
		clearTimeout(this.touchstartTimeoutId);
		callIfExists(this.props.attributes.onTouchEnd, e);
	}

	handleContextMenu = e => {
		this.handleContextClick(e);
		callIfExists(this.props.attributes.onContextMenu, e);
	}

	handleContextClick = e => {
		if(this.props.disable) return;
		if(this.props.disableIfShiftIsPressed && e.shiftKey) return;

		e.preventDefault();
		e.stopPropagation();

		let x = e.clientX || (e.touches && e.touches[0].pageX);
		let y = e.clientY || (e.touches && e.touches[0].pageY);

		if(this.props.posX){
			x -= this.props.posX;
		}
		if(this.props.posY){
			y -= this.props.posY;
		}

		hideMenu();

		let data = callIfExists(this.props.collect, this.props);
		let showMenuConfig = {
				position: {x, y},
				target: this.elem,
				id: this.props.id
		};
		if(data && (typeof data.then === 'function')){
			// it's promise
			data.then((resp) => {
				showMenuConfig.data = assign({}, resp,{
					target: e.target
				});
				showMenu(showMenuConfig);
			});
		} else {
			showMenuConfig.data = assign({}, data,{
				target: e.target
			});
			showMenu(showMenuConfig);
		}
	}

	elemRef = c => {
		this.elem = c;
	}

	render(){
		const {renderTag, attributes, children, role} = this.props;
		const newAttrs = assign({}, attributes, {
			className: cx(cssClasses.menuWrapper, attributes.className),
			onContextMenu: this.handleContextMenu,
			onMouseDown: this.handleMouseDown,
			onMouseUp: this.handleMouseUp,
			onTouchStart: this.handleTouchstart,
			onTouchEnd: this.handleTouchEnd,
			onMouseOut: this.handleMouseOut,
			ref: this.elemRef,
			
			role: role // Q-CUSTOM
		});

		return React.createElement(renderTag, newAttrs, children);
	}
}

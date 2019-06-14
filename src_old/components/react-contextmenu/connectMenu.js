import React,{Component} from 'react';

import PropTypes from 'prop-types';

// import ContextMenuTrigger from './ContextMenuTrigger';
import listener from './globalEventListener';

// collect ContextMenuTrigger's expected props to NOT pass them on as part of the context
//const ignoredTriggerProps = [...Object.keys(ContextMenuTrigger.propTypes), 'children']; // DEFAULT

const propsCtxMenuTrigger = {
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
		
const ignoredTriggerProps = [...Object.keys(propsCtxMenuTrigger),'children'];

// expect the id of the menu to be responsible for as outer parameter
export default function(menuId){
	// expect menu component to connect as inner parameter
	// <Child/> is presumably a wrapper of <ContextMenu/>
	return function(Child){
		// return wrapper for <Child/> that forwards the ContextMenuTrigger's additional props
		return class ConnectMenu extends Component{
			constructor(props){
				super(props);
				this.state = {
					trigger: null
				};
			}

			componentDidMount(){
				//console.log("componentDidMount in connectMenu");
				//console.log(ignoredTriggerProps);
				this.listenId = listener.register(this.handleShow,this.handleHide);
			}

			componentWillUnmount(){
				if(this.listenId){
					listener.unregister(this.listenId);
				}
			}

			handleShow = e => {
				if(e.detail.id !== menuId) return;

				// the onShow event's detail.data object holds all ContextMenuTrigger props
				const {data} = e.detail;
				const filteredData = {};

				for(const key in data){
					// exclude props the ContextMenuTrigger is expecting itself
					if(!ignoredTriggerProps.includes(key)){
						filteredData[key] = data[key];
					}
				}
				this.setState({trigger: filteredData});
			}

			handleHide = () => {
				this.setState({trigger: null});
			}

			render(){
				return <Child {...this.props} id={menuId} trigger={this.state.trigger} />;
			}
		};
	};
}

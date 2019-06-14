import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {ButtonDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';

export default class QdropDown extends Component{
	constructor(props){
		super(props);
		this.state = {
			dropdownOpen:false,// FOR Dropdown
		};
	}

  onDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

	// caret
  render(){
    return (
			<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.onDropdown}>
				<DropdownToggle color={this.props.color} size={this.props.size} className={this.props.btnClass} outline={this.props.outline}>
					{this.props.el}
				</DropdownToggle>
				<DropdownMenu>
					{this.props.children}
				</DropdownMenu>
			</ButtonDropdown>
		);
	}
}

QdropDown.propTypes = {
	color:PropTypes.string,
	size:PropTypes.string,
	btnClass:PropTypes.string,
	outline:PropTypes.bool,
	el:PropTypes.element,
}

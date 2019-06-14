import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {canUseDOM} from '../utils';

export default class Portal extends React.Component{
  componentWillUnmount(){
    if(this.defaultNode){
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  render(){
    if(!canUseDOM){
      return null;
    }

    if(!this.props.node && !this.defaultNode){
      this.defaultNode = document.createElement('div');
      this.defaultNode.classList.add('Qbox');
      if(this.props.docs){
        this.defaultNode.classList.add('docs');
      }
      document.body.appendChild(this.defaultNode);
    }

    return ReactDOM.createPortal(
      this.props.children,
      this.props.node || this.defaultNode
    );
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  node: PropTypes.any
};

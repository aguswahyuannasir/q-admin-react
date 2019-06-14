import React,{Component} from 'react';
// import classNames from 'classnames';
// import {Card} from 'reactstrap';// CardBody,CardHeader,CardFooter,Button
import Portal from './Portal';
import Box from './Box';

export default class Qbox extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     isOpen:false
  //   };

  // }

  componentDidMount(){
    console.log('componentDidMount in Qbox');
    // const me = this;
    // setTimeout(() => {
    //   me.setState({flip:true});
    // },9);
  }
  
// {'show': flip}
  renderBox(){
    // const {flip} = this.state;
    // elClass, 
    const {docs, ...attr} = this.props;

    //  node="div"
    // <div className="Qbox-drop" />
    return (
      <Portal docs={docs}>
        <Box {...attr} />
      </Portal>
    );
  }

  render(){
    const {open} = this.props;
// Card
    if(open){
      return this.renderBox();
    }

    return null;
  }
}

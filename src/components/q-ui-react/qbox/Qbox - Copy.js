import React,{Component} from 'react';
import classNames from 'classnames';
// import {Card} from 'reactstrap';// CardBody,CardHeader,CardFooter,Button

export default class Qbox extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen:false
    };

  }

  componentDidMount(){
    console.log('componentDidMount in Qbox');
    // const me = this;
    // setTimeout(() => {
    //   me.setState({flip:true});
    // },9);
  }
  
// {'show': flip}
  renderBox(){ // flip
    // const {flip} = this.state;
    const {isOpen, elClass, ...attr} = this.props;// ,onFlip,inputFocus

    if(isOpen){
      return (
        <div
          className={
            classNames('card',elClass)
          }
          {...attr}
        />
      );
    }
    // else{
      return null;
    // }
  }

  render(){
    // const {flip} = this.state;
// Card
    return this.renderBox(flip);
  }
}

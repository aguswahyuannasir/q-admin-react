import React,{Component} from 'react';
import classNames from 'classnames';
// import {Card} from 'reactstrap';// CardBody,CardHeader,CardFooter,Button

export default class Qbox extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     isOpen:false
  //   };

  // }

  componentDidMount(){
    console.log('componentDidMount in Box');
    const me = this;
    setTimeout(() => {
      me.refs.qdialog.classList.add('open');
    },1);
  }

  render(){
    const {elClass, ...attr} = this.props;

    return (
      <div
        ref="qdialog"
        className={
          classNames("card q-dialog",
            elClass
          )
        }

        role="dialog"

        {...attr}
      />
    );
  }
}

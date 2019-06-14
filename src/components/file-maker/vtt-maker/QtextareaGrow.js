import React from 'react';

// export default class App extends Component{
export default class QtextareaGrow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // style:{
      //   height:'38px'
      // }
      height:null,
    };
    // this.onKeyDownType = this.onKeyDownType.bind(this);
    this.onKeyUpType = this.onKeyUpType.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount in QtextareaGrow');
    const textArea = this.refs.QtextArea;
    // style:{height:`${textArea.offsetHeight}px`}
    this.setState({
      height:textArea.offsetHeight
    });
  }

  // onKeyDownType(e){
  //   let el = e.target;
  //   console.log(e.key);
  //   console.log(e.keyCode);
  //   console.log(el.value.length);
  //   if(e.key === "Enter" || e.keyCode === 13){//  || (e.key === "Backspace")
  //     setTimeout(function(){
  //       el.style.cssText = 'height:auto';// ;padding:0
  //       // for box-sizing other than "content-box" use:
  //       // el.style.cssText = '-moz-box-sizing:content-box';
  //       el.style.cssText = 'height:'+el.scrollHeight+'px';
  //     },1);
  //   }
  // }

  onKeyUpType(e){
    let el = e.target;
    let dataHeight = el.dataset.height;
    // console.log(e.key);
    // console.log(e.keyCode);
    // console.log(el.value.length);

    // if(e.key === "Enter" || e.keyCode === 13){// 
      setTimeout(function(){
        el.style.cssText = 'height:auto';// ;padding:0
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        if(el.value.length === 0){//  && e.keyCode === 8
          el.style.cssText = 'height:'+dataHeight+'px';
        }else{
          el.style.cssText = 'height:'+el.scrollHeight+'px';
        }
      },1);
    // }
  }

  render(){
    const {height} = this.state;
    const {className,placeholder, ...props} = this.props;
    return (
      <textarea 
        ref="QtextArea"
        // onKeyDown={this.onKeyDownType} 
        onKeyUp={this.onKeyUpType}
        className={`form-control${className ? ' '+className : ''}`}
        placeholder={placeholder}
        data-height={height}
        {...props}
      ></textarea>
    );
  }
}
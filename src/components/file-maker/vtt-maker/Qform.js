import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class Qform extends Component{
  constructor(props){
    super(props);
    this.state = {
      formSubmit:false,
    };
    this.validate = this.validate.bind(this); 
  }

  componentDidMount(){
    console.log('componentDidMount in Qform');
    // console.log(this.props.children);
  }

  Qinput(){
    
    return (
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"  required/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    );
  }

// FOR encType
  checkkEncType(type){
    const cekEncType = ['application/x-www-form-urlencoded','multipart/form-data','text/plain'];
    let arrType = [1,2,3];

    if(arrType.includes(type)){
      return cekEncType[type - 1];
    }
  }

  validate(e){
    const form = this.refs.Qform;
    if(form.checkValidity() === false){
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render(){
    const {onCtxMenu,wrapClassName,formClassName,method,encType,noValidate,children} = this.props;
    

    return (
      <div onContextMenu={onCtxMenu} className={wrapClassName}>
        <form 
          ref="Qform"
          className={`Qform${formClassName ? ' '+formClassName : ''}`} 
          method={method} 
          encType={this.checkkEncType(encType)} 
          noValidate={noValidate}
          onSubmit={this.validate}
        >
          {children}
        </form>
      </div>
    );
  }
}

// Specifies the default values for props:
Qform.defaultProps = {
  // name:'Stranger'
};

// Note: The enctype attribute can be used only if method="post"
Qform.propTypes = {
  wrapClassName:PropTypes.string,
  formClassName:PropTypes.string,
  method:PropTypes.oneOf(['get','post']),
  // encType:PropTypes.oneOf(['application/x-www-form-urlencoded','multipart/form-data','text/plain']),
  encType:PropTypes.number,
  noValidate:PropTypes.bool,

  // Methods
  onCtxMenu:PropTypes.func,
  children:PropTypes.node,// PropTypes.element.isRequired (This must be exactly one element or it will warn), 
}
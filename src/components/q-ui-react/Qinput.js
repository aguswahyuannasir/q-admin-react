/* eslint react/prefer-stateless-function: 0 */

import React,{Component} from 'react';// Fragment
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { mapToCssModules, deprecated, warnOnce, tagPropType } from './utils';

import {InputGroup, Input, FormFeedback, FormText} from '../reactstrap';// Label, 
// import {Btn} from './';//

export default class Qinput extends Component{
  // constructor(props){
    // super(props);
    // this.getRef = this.getRef.bind(this);
    // this.focus = this.focus.bind(this);
  // }

  // getRef(ref){
  //   if(this.props.innerRef){
  //     this.props.innerRef(ref);
  //   }
  //   this.ref = ref;
  // }

  // focus() {
  //   if(this.ref){
  //     this.ref.focus();
  //   }
  // }

  render() {
    let {
      inputClass,
			inputRef,
      label,
      error,
      val,
      info,// FOR <small class="form-text text-muted">
      // prepend,// FOR input-group-prepend
      append,// FOR input-group-append
      onChange,
			//appendClass,
			//appendClick,// FOR click btn append
      ...attr
    } = this.props;

    const classes = classNames(
      !append ? 'rounded-right' : null,
      inputClass
    );

    return (
      <div className="Qinput-legend">			
        <InputGroup>
          <Input 
            className={classes}
            id={attr.id}
            value={val}
            invalid={!!error}
            onChange={onChange}
						innerRef={inputRef}
            {...attr}
          />
          
					{append}

          <label htmlFor={attr.id}>{label}</label>

          {error && <FormFeedback>{error}</FormFeedback>}
        </InputGroup>
        {info && <FormText>{info}</FormText>}
      </div>
    );
  }
}

Input.propTypes = {
  inputClass: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  info: PropTypes.node,
  // prepend: PropTypes.node,
  append: PropTypes.node,
  onChange: PropTypes.func,
	//appendClick: PropTypes.func
};

// Input.defaultProps = defaultProps;

// const propTypes = {
//   type: PropTypes.string,
//   size: PropTypes.string,
//   bsSize: PropTypes.string,
//   valid: PropTypes.bool,
//   invalid: PropTypes.bool,
//   tag: tagPropType,
//   innerRef: PropTypes.oneOfType([
//     PropTypes.object,
//     PropTypes.func,
//     PropTypes.string
//   ]),
//   static: deprecated(PropTypes.bool, 'Please use the prop "plaintext"'),
//   plaintext: PropTypes.bool,
//   addon: PropTypes.bool,
//   className: PropTypes.string,
//   cssModule: PropTypes.object
// };

// const defaultProps = {
//   type: 'text'
// };


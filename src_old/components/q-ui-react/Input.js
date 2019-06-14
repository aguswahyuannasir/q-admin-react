import React,{Component} from 'react';
import {string, bool, object, func, symbol, shape, oneOfType} from 'prop-types';// PropTypes | PropTypes.oneOf(['News', 'Photos']),
import Cls from 'classnames';

export default class Input extends Component{
  /*constructor(props){
    super(props);
    this.state = {
			height: null
    };
  }*/
	
  componentDidMount(){
    //console.log('componentDidMount in Input - src\\components\\q-ui-react\\Input');
		const {as, id, inputRef} = this.props;// grow, 
		/*if(grow && (as === "textarea" && inputRef)){
			let textArea = this.refs[inputRef];
			setTimeout(() => {
				this.setState({
					height: textArea.offsetHeight
				});
				console.log(textArea);
			},9);
		}*/
		
		if(as === "select" && (id || inputRef)){
			let sel = document.getElementById(id) || this.refs[inputRef];			
			if(sel.value.length > 0) sel.classList.add('isFill');
		}
  }
	
	onInput = (e) => {
		let et = e.target;
		// et.nodeName !== 'SELECT' || et.nodeName.toLowerCase() !== 'select'
		if(this.props.as !== 'select') return;
		
		et.classList.toggle("isFill", et.value.length > 0);
	}
	
  onKeyUp = e => {
		const {onKeyUp, grow} = this.props;
		
		// !this.state.height && !grow
		if(!grow) return;// !grow && (as === "textarea" && inputRef)
		
    let el = e.target;
    let dataHeight = el.dataset.height;

    // if(e.key === "Enter" || e.keyCode === 13){// 
      setTimeout(function(){
        el.style.cssText = 'height:auto';// ;padding:0
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
				let scrl = el.scrollHeight + 2;
				
        if(el.value.length === 0){//  && e.keyCode === 8
          el.style.cssText = 'height:'+dataHeight+'px';
        }else{
          el.style.cssText = 'height:'+scrl+'px';
        }
      },4);
    // }
		
		if(onKeyUp) onKeyUp(e);
  }

  render(){
		//const {height} = this.state;
    let {as:As, label, elClass, inline, inputRef, inputClass, type, id, invalid, valid, error, errType, grow, ...attr} = this.props;// isize
		const checkAs = As === 'select' ? "custom-select" : undefined;// form-control

		//const labelClass = inline ? 'd-inline-block' : undefined;
		
    return (
			<div className={
				Cls("q-input", elClass)
			}>
				<label className={inline ? 'd-inline-block' : undefined} htmlFor={id ? id : undefined}>
					<As
						ref={inputRef}
						
						className={
							Cls(checkAs,"field",{
								// [`${As === 'select' ? `custom-select-${isize}` : undefined}`]: isize,// [`${As === 'select' ? `custom-select-${isize}` : `form-control-${isize}`}`]: isize,
								"is-invalid" : invalid,
								"is-valid" : valid
							},inputClass)
						}
						
						id={id ? id : undefined} 
						
						//type={As === 'textarea' || As === 'select' ? null : type}
						type={As === 'textarea' || As === 'select' ? null : !type ? 'text' : type}
						
						placeholder={As === 'select' ? null : " "} // label
						
						//defaultValue={As === 'select' ? holder : null}
						//onChange={handleChange}
						//{...attr}
						//data-height={grow && height ? height : null} // (As === "textarea" && inputRef) ? height : null
						
						{...attr} 
						
						onKeyUp={this.onKeyUp} 
						onInput={this.onInput}
					/>
					<span>{label}</span>
					
					{(error && errType === "tip") && <div className="invalid-tooltip">{error}</div>}
					
					{(error && errType === "feed") && <div className="invalid-feedback">{error}</div>}
				</label>
				{/* (error && errType === "feed") && <div className="invalid-feedback">{error}</div> */}
			</div>
    );
  }
}

const boolStr = oneOfType([
	bool,
	string
]);

Input.defaultProps = {
	as: "input",
  type: "text",
	errType: "feed"
	//holder: " "
};

Input.propTypes = {
	as: oneOfType([
		func,
		string,
		shape({$$typeof: symbol, render: func})
	]),
	grow: bool,
	// isize: string,
	elClass: string,
	inputClass: string,
  type: string,
	errType: string,
  //color: string,
  disabled: bool,
  inputRef: oneOfType([
    object,
    func,
    string
  ]),
  //onClick: func,
	label: string,
	//holder: string,
	invalid: boolStr,
	valid: boolStr, // bool
	error: boolStr
};



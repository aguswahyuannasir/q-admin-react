import React from 'react';
//import {setCss} from './shared';// import {css} from './shared';

// <div className="p-2">To:</div>
function ComposeMail({children, onChangeSubject, onBlurSubject}){	
  return (
    <React.Fragment>
			<div className="d-flex align-items-center">
				<div className="position-relative flex1" style={{zIndex:9}}>{children}</div>
			</div>
			<input 
				onBlur={onBlurSubject} 
				onChange={onChangeSubject} 
				className="form-control form-control-sm border-0 rounded-0 shadow-none" 
				type="text" 
				placeholder="Subject" 
			/>
    </React.Fragment>
  )
}

class Recipient extends React.Component{
  static defaultProps = {
    isValid: true,
  }
  
	button = React.createRef()
  focusButton = () => this.button.current.focus()
  
	render(){
    const {children, onRemove, isValid} = this.props
    
		return (
      <div
        onClick={this.focusButton}
        style={{
          backgroundColor: '#f5f5f5',
          fontSize: '0.9em',
          border: '1px solid',
          borderColor: isValid ? '#d9d9d9' : '#d61111',
          borderRadius: 4,
          paddingTop: 2,
          paddingBottom: 2,
          paddingRight: 6,
          paddingLeft: 6,
          marginLeft: 4,
          marginRight: 4,
          display: 'flex',
          cursor: 'pointer',
        }}
      >
        {children}
        
				{onRemove ? (
          <button
            ref={this.button}
            style={{
              WebkitAppearance: 'none',
              marginLeft: 6,
              color: '#868686',
              backgroundColor: '#f5f5f5',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
            }}
            onClick={onRemove}
          >
            x
          </button>
        ) : null}
      </div>
    )
  }
}

export {ComposeMail, Recipient}

import React from 'react';
//import {setCss} from './shared';// import {css} from './shared';

function ComposeMail({children}) {
  return (
    <div>
      <div style={{padding: 10}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: 10,
          }}
        >
          <div style={{marginRight: 10}}>To</div>
          <div style={{flex: '1'}}>{children}</div>
        </div>
        <div
          style={{
            borderTop: '1px solid #cfcfcf',
            borderBottom: '1px solid  #cfcfcf',
            marginLeft: -10,
            marginRight: -10,
          }}
        >
          <input className="form-control" type="text" placeholder="Subject" />
        </div>
        <div style={{paddingTop: 10}}>
          <textarea
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
              minHeight: 200,
              outline: 'none',
              resize: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}

class Recipient extends React.Component {
  static defaultProps = {
    isValid: true,
  }
  button = React.createRef()
  focusButton = () => this.button.current.focus()
  render() {
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

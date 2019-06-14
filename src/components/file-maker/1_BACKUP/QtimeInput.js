import React from 'react';
import PropTypes from 'prop-types';
import {Modal, ModalBody} from 'reactstrap';// Button,ModalHeader,ModalFooter
import {isMobile} from '../utils/Qutils';

const DEFAULT_COLON = ':';
const DEFAULT_VALUE_SHORT = `00${DEFAULT_COLON}00`;
const DEFAULT_VALUE_FULL = `00${DEFAULT_COLON}00${DEFAULT_COLON}00`;

export function isNumber(value){
  const number = Number(value);
  return !isNaN(number) && String(value) === String(number);
}

export function formatTimeItem(value){
  return `${value || ''}00`.substr(0,2);
}

export function validateTimeAndCursor(
  showSeconds = false,
  value = '',
  defaultValue = '',
  colon = DEFAULT_COLON,
  cursorPosition = 0
){
  const [oldH,oldM,oldS] = defaultValue.split(colon);

  let newCursorPosition = Number(cursorPosition);
  let [newH,newM,newS] = String(value).split(colon);

  newH = formatTimeItem(newH);
  if(Number(newH[0]) > 2){
    newH = oldH;
    newCursorPosition -= 1;
  }else if(Number(newH[0]) === 2){
    if(Number(oldH[0]) === 2 && Number(newH[1]) > 3){
      newH = `2${oldH[1]}`;
      newCursorPosition -= 2;
    }else if(Number(newH[1]) > 3){
      newH = '23';
    }
  }

  newM = formatTimeItem(newM);
  if(Number(newM[0]) > 5){
    newM = oldM;
    newCursorPosition -= 1;
  }

  if(showSeconds){
    newS = formatTimeItem(newS);
    if(Number(newS[0]) > 5){
      newS = oldS;
      newCursorPosition -= 1;
    }
  }
  const validatedValue = showSeconds ? `${newH}${colon}${newM}${colon}${newS}` : `${newH}${colon}${newM}`;
  return [validatedValue,newCursorPosition];
}

export default class QtimeInput extends React.Component{
  static propTypes = {
    value:PropTypes.string,// .isRequired
    onChange:PropTypes.func,// .isRequired
    showSeconds:PropTypes.bool,
    input:PropTypes.element,
    colon:PropTypes.string,
    style:PropTypes.object
  };

  static defaultProps = {
    showSeconds:false,
    input:null,
    style:{},
    colon:DEFAULT_COLON
  };

  constructor(props, ...args){
    super(props, ...args);

    this.configure(props);

    const [validatedTime] = validateTimeAndCursor(this._showSeconds,this.props.value,this._defaultValue,this._colon);

    this.state = {
      value:validatedTime,
      // typeInput:false,// Q-CUSTOM
      keyboard:false,// Q-CUSTOM
    };

    this.onInputChange = this.onInputChange.bind(this);
    // this.toggleType = this.toggleType.bind(this);// Q-CUSTOM
    this.onKeyboard = this.onKeyboard.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount in QtimeInput');

  }

  shouldComponentUpdate(nextProps){ // componentWillReceiveProps
    const {value} = this.props;

    this.configure(nextProps);

    if(value !== nextProps.value){
      const [validatedTime] = validateTimeAndCursor(
        this._showSeconds,
        nextProps.value,
        this._defaultValue,
        this._colon
      );
      this.setState({
        value:validatedTime
      });
      return false;
    }else{
      return true;
    }
  }

  configure(props){
    this._colon = props.colon && props.colon.length === 1 ? props.colon : DEFAULT_COLON;
    this._showSeconds = Boolean(props.showSeconds);
    this._defaultValue = this._showSeconds ? DEFAULT_VALUE_FULL : DEFAULT_VALUE_SHORT;
    this._maxLength = this._defaultValue.length;
  }

  onInputChange(event,callback){
    const oldValue = this.state.value;
    const inputEl = event.target;
    const inputValue = inputEl.value;
    const position = inputEl.selectionEnd;
    const isType = inputValue.length > oldValue.length;
    const addedCharacter = isType ? inputValue[position - 1] : null;
    const removedCharacter = isType ? null : oldValue[position];
    const colon = this._colon;

    let newValue = oldValue;
    let newPosition = position;

    if(addedCharacter !== null){
      if(position > this._maxLength){
        newPosition = this._maxLength;
      }else if ((position === 3 || position === 6) && addedCharacter === colon){
        newValue = `${inputValue.substr(0, position - 1)}${colon}${inputValue.substr(position + 1)}`;
      }else if((position === 3 || position === 6) && isNumber(addedCharacter)){
        newValue = `${inputValue.substr(0, position - 1)}${colon}${addedCharacter}${inputValue.substr(position + 2)}`;
        newPosition = position + 1;
      }else if(isNumber(addedCharacter)){
        // user typed a number
        newValue = inputValue.substr(0, position - 1) + addedCharacter + inputValue.substr(position + 1);
        if(position === 2 || position === 5){
          newPosition = position + 1;
        }
      }else{
        // if user typed NOT a number, then keep old value & position
        newPosition = position - 1;
      }
    }else if(removedCharacter !== null){
      if((position === 2 || position === 5) && removedCharacter === colon){
        newValue = `${inputValue.substr(0,position - 1)}0${colon}${inputValue.substr(position)}`;
        newPosition = position - 1;
      }else{
        // user removed a number
        newValue = `${inputValue.substr(0, position)}0${inputValue.substr(position)}`;
      }
    }

    const [validatedTime, validatedCursorPosition] = validateTimeAndCursor(
      this._showSeconds,
      newValue,
      oldValue,
      this._colon,
      newPosition
    );

    this.setState({value: validatedTime},() => {
      inputEl.selectionStart = validatedCursorPosition;
      inputEl.selectionEnd = validatedCursorPosition;
      callback(validatedTime);
    });

    event.persist();
  }

// DEV
  onKeyboard(){
    if(isMobile()){
      console.log('onKeyboard');
      this.setState({keyboard:!this.state.keyboard});
    }
  }

  onOpenModal(){
    console.log('onOpenModal');
    // let bodyHeight = document.body.scrollHeight;// offsetHeight
    document.body.classList.add("openKey");
    let input = this.refs.timeInput;
    // setTimeout(function(){
      // window.scrollTo(0,bodyHeight);
      input.classList.add("focus");
    // },5);
    // console.log(bodyHeight);
  }

  onCloseModal(){
    console.log('onCloseModal');
    let input = this.refs.timeInput;
    document.body.classList.remove("openKey");
    // setTimeout(function(){
      // input.blur();
      input.classList.remove("focus");
    // },1);
  }

  render(){
    const {value} = this.state;// ,typeInput
    const {onChange,style,showSeconds,input,colon, ...props} = this.props; //eslint-disable-line no-unused-vars
    const onChangeHandler = (e) => this.onInputChange(e,(v) => onChange && onChange(e,v));

    if(input){
      return React.cloneElement(input,{
        ...props,
        value,
        style,
        onChange:onChangeHandler
      });
    }

    return (
      <React.Fragment>
        <input
          ref="timeInput"
          type="text"// {typeInput ? "number" : "text"}// "text"// number, DEFAULT = text
          {...props}
          value={value}
          readOnly={isMobile()}// Q-CUSTOM
          onClick={this.onKeyboard}// Q-CUSTOM | onFocus
          // onBlur={this.toggleType}// Q-CUSTOM
          onChange={onChangeHandler}
          // style={{width: showSeconds ? 54 : 35, ...style}}
        />
        {isMobile() ?
          <Modal 
            size="sm" 
            isOpen={this.state.keyboard} 
            toggle={this.onKeyboard} 
            wrapClassName="modalKeyboard"
            contentClassName="bg-light"
            // onEnter={this.onOpenModal}
            onOpened={this.onOpenModal}
            onClosed={this.onCloseModal}// onExit
          >
            <ModalBody>
              <div className="form-row">
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">1</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">2</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">3</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary mi mi-close-outline scale15" type="button"/>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">4</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">5</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">6</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">Go</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">7</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">8</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">9</button>
                </div>
                <div className="col-sm-3 col-xs-3 mb-2">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">.</button>
                </div>

                <div className="col-sm-3 col-xs-3">
                  <span className="btn btn-lg btn-block bg-ccc">&nbsp; </span>
                </div>
                <div className="col-sm-3 col-xs-3">
                  <button className="btn btn-lg btn-block btn-outline-secondary" type="button">0</button>
                </div>
                <div className="col-sm-3 col-xs-3">
                  <span className="btn btn-lg btn-block bg-ccc">&nbsp; </span>
                </div>
                <div className="col-sm-3 col-xs-3">
                  <button className="btn btn-lg btn-block btn-outline-secondary mi mi-settings-outline scale15" type="button"/>
                </div>
              </div>
            </ModalBody>
          </Modal> : ''
        }
      </React.Fragment>
    );
  }
}

// backdrop="static"

/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
<ModalFooter>
  <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
</ModalFooter> */
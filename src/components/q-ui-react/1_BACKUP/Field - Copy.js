import React,{Component} from "react";// ,Fragment
import Btn from './Btn';
import {dateLocale} from '../utils/Qutils';

export default class Field extends Component{

  onChange = (e) => {
    const {onChange, lang} = this.props;
    let et = e.target;
    let parent = et.closest('.f-date');
    let formatDate = parent.querySelector('.formatDate');// form-group
    let btnDel = parent.querySelector('.btnDel');

    if(onChange){
      onChange(e);
    }

    if(et.value && et.value.length > 0){
      formatDate.value = dateLocale(et.value, lang);// 'id'
      btnDel.classList.remove('d-none');
    }else{
      formatDate.value = "";
      btnDel.classList.add('d-none');
    }
  }

  onClear = (e) => {
    let et = e.target;
    let parent = et.closest('.f-date');
    let date = parent.querySelector('[type="date"]');
    let formatDate = parent.querySelector('.formatDate');

    date.value = "";
    formatDate.value = "";
    et.classList.add('d-none');
  }

	render(){
		const {elClass, size, placeholder, kind, ...attr} = this.props;

    return (
      <div className={`f-date${elClass ? ` ${elClass}` : ''}`}>
        <input 
          onChange={this.onChange} 
          type="date" 
          className={`form-control${size ? ` form-control-${size}` : ''}`} 
          {...attr}
          // ✖
        />
        
        <div className={`input-group${size ? ` input-group-${size}` : ''}`}>
          <input type="text" className="form-control formatDate" placeholder={placeholder} disabled />
          <div className="input-group-append">
            <Btn onClick={this.onClear} kind="danger" className="btnDel d-none">&times;</Btn>
            <Btn kind={kind} className="btnDate bold">&#9776;</Btn>
          </div>
        </div>
      </div>
    )
  }
}

Field.defaultProps = {
  lang: 'en'
};
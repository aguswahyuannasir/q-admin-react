import React,{Component} from "react";// ,Fragment
import Btn from './Btn';
import {dateLocale} from '../utils/Qutils';

export default class FormDate extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      date: null
    };
  }

  componentDidMount(){
    // console.log('componentDidMount in FormDate - q-ui\\FormDate');
    const {val, lang} = this.props;// 

    if(val){
      this.setState({
        value: val,
        date: dateLocale(val, lang)
      });
      // this.formatDate.value = dateLocale(val, lang);
    }
  }

  onChange = (e) => {
    const {onChange, lang} = this.props;// 
    let et = e.target;
    // let parent = et.closest('.f-date');
    // let formatDate = parent.querySelector('.formatDate');// form-group
    // let btnDel = parent.querySelector('.btnDel');

    if(onChange){
      onChange(e);
    }

    // console.log(et.value);// 2019-05-03 - y-m-d

    this.setState({
      value: et.value,
      date: dateLocale(et.value, lang)
    });
    // this.displayDate(et, lang);// btnDel
  }

  displayDate(el, lang){ // btnDel
    if(el.value && el.value.length > 0){
      // this.formatDate.value = dateLocale(el.value, lang);// 'id'
      // btnDel.classList.remove('d-none');
    }else{
      // this.formatDate.value = "";
      // btnDel.classList.add('d-none');
    }
  }

  onClear = () => {
    // let et = e.target;
    // let parent = et.closest('.f-date');
    // let date = parent.querySelector('[type="date"]');
    // let formatDate = parent.querySelector('.formatDate');

    // date.value = "";
    // formatDate.value = "";
    // et.classList.add('d-none');
    this.setState({value: '', date: null});
  }

	render(){
    const {value, date} = this.state;
		const {elClass, val, lang, size, kind, ...attr} = this.props;// placeholder

    return (
      <div className={`f-date${elClass ? ` ${elClass}` : ''}`}>
        <input 
          onChange={this.onChange} 
          value={val ? val : value} // value && value.length > 0 ? value : val
          type="date" 
          className={`form-control${size ? ` form-control-${size}` : ''}`} 
          {...attr}
          // ✖
        />
        
        <div className={`input-group${size ? ` input-group-${size}` : ''}`}>
          <div className="form-control disabled formatDate" disabled>
            {date}
          </div>
          
          <div className="input-group-append">
            {(value && value.length > 0) && <button onClick={this.onClear} className="close btn-reset" type="button" title="Reset">&times;</button>}
            <Btn kind={kind} className="bold">&#9776;</Btn>
          </div>
        </div>
      </div>
    )
  }
}

FormDate.defaultProps = {
  lang: 'en'
};
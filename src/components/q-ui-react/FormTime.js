import React,{Component,Fragment} from "react";// 
import Btn from './Btn';
//import {dateLocale} from '../utils/Qutils';

export default class FormTime extends Component{
  constructor(props){
    super(props);
    this.state = {
      hour: '',
			minutes: '',
			'am-pm': '',
      reset: false
    };
  }

  //componentDidMount(){
    //console.log('componentDidMount in FormTime - q-ui\\FormTime');

    /*const {val, lang} = this.props;// 

    if(val){
      this.setState({
        value: val,
        date: dateLocale(val, lang)
      });
      // this.formatDate.value = dateLocale(val, lang);
    }*/
  //}

  onChange = (e, state) => {
    const {onChange} = this.props;// , lang
    let et = e.target;
    // let parent = et.closest('.f-date');
    // let formatDate = parent.querySelector('.formatDate');// form-group
    // let btnDel = parent.querySelector('.btnDel');

    if(onChange){
      onChange(e);
    }

    // console.log(et.value);// 2019-05-03 - y-m-d

    this.setState({
      [state]: et.value
    },() => {
			if(this.state.hour.length > 0 || this.state.minutes.length > 0 || this.state['am-pm'].length > 0){
				this.setState({reset: true});
			}else{
				this.setState({reset: false});
			}
		});
  }

  onReset = () => {
		if(this.state.reset){
			this.setState({
				hour: '',
				minutes: '', 
				'am-pm': '',
				reset: false
			});
		}
  }
	
	inputDate(ln, v, state, holder){
		
		return (
			<select onChange={e => this.onChange(e, state)} value={v} className="form-control" title={state}>
				<option>{holder}</option>
				{holder === 'm' && <option value="00">00</option>}
				
				{ln ? 
					Array.from({length: ln}).map((v, k) => {
						//let toHour = k + 1 < 10 ? `0${k + 1}` : k + 1;
						//let toMin = k + 1 < 10 ? `0${k + 1}` : k + 1;
						let val = k + 1 < 10 ? `0${k + 1}` : k + 1; // state === 'hour' ? toHour ? toMin;
						return <option key={k} value={val}>{val}</option>
					})
					:
					<Fragment>
						<option value="AM">AM</option>
						<option value="PM">PM</option>
					</Fragment>
				}
			</select>
		)
	}

	render(){
    const {hour, minutes, reset} = this.state;// date
		const {elClass, fsize} = this.props;// , val, lang, size, kind, ...attr

    return (
			<div className={`input-group${fsize ? ` input-group-${fsize}` : ''} f-time${elClass ? ` ${elClass}` : ''}`}>
				{this.inputDate(12, hour, 'hour', 'h')}

				<input readOnly className="form-control" type="text" value=":" tabIndex="-1" />

				{this.inputDate(59, minutes, 'minutes', 'm')}

				{this.inputDate(0, this.state['am-pm'], 'am-pm', '--')}

				<div className="input-group-append">
					<Btn onClick={this.onReset} className={`lh1 i q-${reset ? 'close' : 'clock'}`} tip={`${reset ? "Reset" : ""}`} tabIndex="-1" />
				</div>
			</div>
    )
  }
}

//InputTime.defaultProps = {
  //lang: 'en'
//};
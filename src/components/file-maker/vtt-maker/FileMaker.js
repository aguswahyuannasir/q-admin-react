import React from 'react';
// import PropTypes from 'prop-types';
// import {isMobile} from '../utils/Qutils';// bindMethods, 
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';// UncontrolledTooltip

import Flex from '../../components/q-ui-react/Flex';
import Btn from '../../components/q-ui-react/Btn';
import Input from '../../components/q-ui-react/Input';
import Form from '../../components/q-ui-react/Form';

import QtimeInput from './QtimeInput';
// import QtextareaGrow from './QtextareaGrow';
// import Qwave from './Qwave';

// import {TimePicker,FontIcon} from 'react-md';
// import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

export default class FileMaker extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      submitVtt: false,
      vttItems: [],
      textVtt: '',
      WEBVTT: null,// FOR parse concat text vtt
      blobVtt: null,// FOR download vtt (DEV / OPTION)
      time: "00:00:00",// DEV FOR time input
    };

  }

  componentDidMount(){
    console.log('componentDidMount in Qvtt');
    // console.log();
  }

  prevDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

// FOR change to add vtt items
  onChangeAddVtt = (e) => {
    this.setState({textVtt: e.target.value});
  }

// FOR Add text to VTT
  onAddText = (e) => {
    const {textVtt} = this.state;
    console.log('onAddText');
    e.preventDefault();
    e.stopPropagation();

    // if(!textVtt.length){
    //   return;
    // }
    const newItem = {
      textVtt:textVtt,
      id:Date.now()
      // dataID:
    };
    this.setState(state => ({
      submitVtt:true,
      vttItems:state.vttItems.concat(newItem),
      textVtt:''
    }));
  }

// Remove Vtt text item
  onRemoveTextVtt = (e) => {
    console.log('onRemoveTextVtt');
		const id = parseInt(e.target.dataset.x);
		const {vttItems} = this.state;

		vttItems.splice(id,1);
    this.setState({
      vttItems,
      WEBVTT:null,// FOR REMOVE download button link
      blobVtt:null// FOR REMOVE download button link
    });

    if(!vttItems.length){
      this.setState({submitVtt:false});
    }
  }

  submitFormAddText = (e) => {
    e.preventDefault();
    console.log('submitFormAddText');
    let form = this.refs.Qvttform;
    form.submit();
  }

// FOR save VTT when submit form
  onSaveVtt = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let et = e.target;// e.nativeEvent.target
    // const vttForm = this.refs.Qvttform;
    // let cek = e.target.checkValidity();
    if(et.checkValidity()){
      console.log('checkValidity true');
      let sub = ["WEBVTT\nKind: captions\n\n"];// OPTION FROM Yotube = Kind: captions\n | Language: id\n
      // console.log(e.nativeEvent);

      et.classList.remove("was-validated");// toggle | remove
      
      for(let i=0; i < et.length; i++){
        if(i !== (et.length - 1)){
          // resConcat = sub.concat(`\n`,et[i].value);
          if(et[i].classList.contains("timeStart")){
            sub.push(`${et[i].value} --> `);
          }
          else if(et[i].classList.contains("timeEnd")){
            sub.push(`${et[i].value}\n`);
          }
          else if(et[i].classList.contains("subTxt")){
            sub.push(`${et[i].value}\n\n`);
          }
          // console.log(et[i]);
        }
      }

      let reConcat = "".concat(...sub);
      let newBlob = new Blob([reConcat],{type:'text/vtt'});
      let resBlob = window.URL.createObjectURL(newBlob);

      console.log(reConcat);
      this.setState({
        WEBVTT:reConcat,
        blobVtt:resBlob,
      });
    }else{
      console.log('checkValidity false');
      e.target.classList.add("was-validated");
    }
  }

// DEV FOR time input
  onTimeChange = (e, time) => {
		// const id = parseInt(e.target.dataset.id);
		// const {vttItems} = this.state;

		// vttItems.splice(id,1);
    // this.setState({vttItems});
    console.log(this.state.vttItems);
    this.setState({
      time,

    });
  }

// DEV onChange TimePicker for vtt set
  // onChangeTimePick(timeStr,dateObj){// ,e
  //   let inputDate = this.refs.timePickVtt._container.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
  //   let me = this;
  //   console.log('onChangeTimePick');
  //   console.log('timeStr',timeStr);
  //   console.log('dateObj',dateObj);
  //   // console.log('e',e);
  //   setTimeout(function(){
  //     // let sliceTime = inputDate.value.slice(0,-3);
  //     let sliceTime = me.parseDate({hour:'numeric',minute:'numeric',second:'numeric',hour12:false,timeZone:'Asia/Jakarta'},dateObj);
  //     console.log(sliceTime);
  //     inputDate.value = sliceTime;
  //   },10);
  // }

// DEV FOR parse date to vtt
  // parseDate(format,date){
  //   return new Intl.DateTimeFormat('en-US',format).format(date);
  // }

  onVideoEditPlay = () => {
    const vid = document.getElementById("videoEdit");
    if(vid.paused){
      vid.play();
    }else{
      vid.pause();
    }
  }

  render(){
    const {textVtt, vttItems, submitVtt, WEBVTT, blobVtt, time} = this.state;
    // const dateFormat = {hour:'numeric',minute:'numeric',second:'numeric',hour12:false,timeZone:'Asia/Jakarta'};// ,timeZoneName:'short'
    // const dateNow = new Date();// Date.UTC(2012,11,20,3,0,0)
    // console.log(this.parseDate(dateFormat,dateNow));
    
    return (
      <div className="row no-gutters">
        <div className="col-md-2">
          <div className="card">
            <div className="card-header">Campusroads</div>
            <div className="list-group list-group-flush">
              <a href="/" className="list-group-item list-group-item-action">Dashboard</a>
              <a href="/" className="list-group-item list-group-item-action">Video manager</a>
              <a href="/" className="list-group-item list-group-item-action">Channel</a>
            </div>
          </div>
        </div>

        <div className="col-md-10">
          <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h5 mb-0">Transcribe and set timings: Indonesian</h1>
              <div>
                <Btn size="sm" kind="primary" disabled={!submitVtt}>Delete Draft</Btn>{" "}
                <Btn size="sm" kind="primary" disabled={!submitVtt}>Publish</Btn>
              </div>
            </div><hr/>

            <div className="d-flex justify-content-between mb-2">
              <UncontrolledButtonDropdown>
                <DropdownToggle caret outline size="sm">Action</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Upload file</DropdownItem>
                  <DropdownItem tag="a" href={blobVtt} download="campusroads_default.vtt">Download</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <div>
                <Btn kind="link">Keyboard shortcuts</Btn>{" | "}
                <Btn kind="link">Help</Btn>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-5">{/* onContextMenu={this.prevDefault} */}
                <Form 
                  onSubmit={this.onAddText} 
                  elClass="input-group form-addVtt mb-3" 
                >
                  <textarea 
                    onChange={this.onChangeAddVtt} 
                    className="form-control" 
                    rows="4" 
                    value={textVtt} 
                    placeholder="Type subtitle here then press Enter" 
                  />
                  <div className="input-group-append align-self-end">
                    <Btn kind="primary" className="i ion-md-add" type="submit" />
                  </div>
                </Form>

                <Form 
                  elRef="Qvttform"
                  id="formSaveVtt"
                  elClass="Qvtt-form"
                  // method="post"
                  noValidate
                  onSubmit={this.onSaveVtt}
                >
                  {/* PARSE Vtt items |  change={this.onTimeChange} */}
                  <VttInputs items={vttItems} remove={this.onRemoveTextVtt} time={time} />

                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      {WEBVTT && blobVtt ?
                        <a href={blobVtt} className="btn btn-sm btn-info" download="campusroads_default.vtt">Download</a> : ''
                      }
                    </div>
                    <div>
                      <span className={`btn btn-sm btn-secondary${submitVtt ? '' : ' disabled'}`} role="button" tabIndex="0">Save Draft</span>{" "}
                      <Btn size="sm" kind="primary" type="submit" disabled={!submitVtt}>Publish</Btn>
                    </div>
                  </div>
                </Form>
              </div>

              <div className="col-md-7">
                <div className="embed-responsive embed-responsive-16by9 bg-dark">
                  <video 
                    id="videoEdit" 
                    controls 
                    muted 
                    type="video/mp4" 
                    className="embed-responsive-item" 
                    src="/media/SampleVideo_360x240_20mb.mp4" />
                </div>

                {/*<Qwave
                  playVideo={this.onVideoEditPlay}

                />*/}               
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function VttInputs(props){
  if(props.items.length){
    return (
      <div className="list-group vtt-items">
        {props.items.map((i,idx) => (
          <div key={i.id} className="list-group-item list-group-item-action">
            <div className="input-group flex-nowrap">
              <div className="vtt-time">
                <div className="tip tipR" aria-label="Start time">
                  <QtimeInput
                    className="form-control form-control-sm txt-num timeStart"
                    id={`start${i.id}`}
                    value={props.time}
                    showSeconds={true}
                    onChange={props.change}
                    // title="Start time"
                    data-id={idx}
                  />
                </div>

                <div className="tip tipR" aria-label="End time">
                  <QtimeInput
                    className="form-control form-control-sm txt-num timeEnd"
                    id={`end${i.id}`}
                    value={props.time}
                    showSeconds={true}
                    onChange={props.change}
                    data-id={idx}
                    // title="End time"
                  />
                </div>
              </div>
              
              <Input
                as="textarea" 
                grow 
                // error={errDescription} 
                elClass="mx-2" 
                labelClass="mb-0" 
                inputClass="resize-no subTxt" 
                label="Enter subtitle" 
                defaultValue={i.textVtt}
                required 
                data-id={idx} 
              />

              <div className="input-group-append">
                <Flex dir="column" 
                  // justify="between"
                >
                  <Btn 
                    as="span" 
                    onClick={props.remove}
                    size="sm" 
                    className="i ion-md-close" 
                    tip="Remove / Delete"
                    data-x={idx}
                  />
                  <Btn
                    as="span" 
                    size="sm" 
                    kind="primary" 
                    className="i ion-md-add" 
                    tip="Add"
                    data-add={idx}
                  />
                </Flex>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }else{
    return null;
  }
}

//  align-self-start

/* <TimePicker
  ref="timePickVtt"
  className="md-cell md-cell--bottom QtimePick"
  id="timeVttPick"
  placeholder="Select a time subtitle"
  icon={<FontIcon className="mi mi-clock"/>}
  // defaultTimeMode="second"// default: 'hour' | minute, second
  // locales="en-US"
  // defaultValue={dateNow}
  formatOptions={dateFormat}
  showSeconds
  hoverMode
  autoOk
  onChange={this.onChangeTimePick}
/> */
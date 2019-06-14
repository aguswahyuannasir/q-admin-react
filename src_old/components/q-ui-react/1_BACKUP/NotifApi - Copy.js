import React from 'react';
import PropTypes from 'prop-types';
import Push from 'push.js';
const shortid = require('shortid');

export default class NotifApi extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      permission:"default" // DEV Q-CUSTOM FOR check permission
    };

    this.audio = null;// Q-CUSTOM FOR notif sound

    this.supported = this.supported.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.clearAll = this.clearAll.bind(this);

    this.onGranted = this.onGranted.bind(this);
    this.onDenied = this.onDenied.bind(this);
  }

  componentDidMount(){
    // console.log(this.audio);
    this.props.onRef(this);
  }

  componentWillUnmount(){
    this.props.onRef(undefined);

    // this.audio.removeEventListener("ended",this.removeAudio);
    this.audio = null;
    delete this.audio;
  }

  supported(){
    console.log(Push.Permission.has());
    console.log(Push.Permission.get());

    if("Notification" in window){ // !("Notification" in window)
      return true;
    }else{
      return false;
    }
    
    // if(!("Notification" in window)) return true;
    // else return false;
  }

  onGranted(){
    console.log('onGranted');
    this.setState({permission:"granted"});
  }

  onDenied(){
    console.log('onDenied');
    this.setState({permission:"denied"});
    alert('Your notification browser is enabled, Please enable your notification');
  }

  show(){
    const {permission} = this.state;
    const {
      active,
      title, body, data, icon, link, 
      interaction, tag, timeout, vibrate, sound,
      silent, onClick, onError} = this.props;// ,onShow

    // if(Push.Permission.get() === "default"){
    //   console.warn('Please setting your notification');
    // }else if(Push.Permission.get() === "denied"){
    //   alert('Your notification browser is enabled, Please enable your notification');
    // }

    Push.Permission.request(this.onGranted,this.onDenied);

    if(permission === "denied"){
      return;
    }

    if(!active){
      return;
    }

    // Q-CUSTOM let pushPromise = Push.create(this.props.title,{
    Push.create(title,{
      body: body ? body : null,
      data: data ? data : null,// Q-CUSTOM FOR Data to pass to ServiceWorker notifications (FROm docs push.js-v1.0.9)
      icon: icon ? icon : null,
      link: link ? link : null,//  Q-CUSTOM FOR  (FROm docs push.js-v1.0.9)

      requireInteraction: interaction ? interaction : false,
      tag: tag ? tag : shortid.generate(),
      timeout: timeout ? timeout : null,
      vibrate: vibrate ? vibrate : null,// Q-CUSTOM FOR vibration device - Available in Mobile Chrome only (FROm docs push.js-v1.0.9)
      silent: silent ? silent : null,
      onClick: onClick ? onClick : null,
      onError: onError ? onError : null,
      // onShow: onShow ? onShow : null
    });

    // Q-CUSTOM
    // pushPromise
    // promise.then(function(notif){
    //   notif.close();
    // });

    if(sound && Push.Permission.get() === "granted"){
      console.log('sound active');
      // console.log(this.audio);
      if(!this.audio){
        this.audio = new Audio("sound/bip.wav");// tug.wav | sound.mp3"
      }
      this.audio.play();
      // this.audio.addEventListener("ended",this.removeAudio);

      // this.setState(
      //   {soundPlay:true},
      //   () => {
      //     this.audio = new Audio("sound/sound.mp3");
      //     if(this.state.soundPlay && this.audio){
      //       this.audio.play();

      //       this.audio.addEventListener("ended",this.removeAudio);
      //     }
      //     else{
      //       this.removeAudio();
      //     }
      //   }
      // );
      // this.state.soundPlay ? this.audio.play() : this.audio.pause();
    }
  }

  // removeAudio(){
  //   this.audio = null;
  //   delete this.audio;
  //   console.log(this.audio);
  // }

  close(tag){
    Push.close(tag);
  }

  clearAll(){
    console.log('clearAll');
    Push.clear();
  }

  render(){
    return (
      <div className="d-none notifApi" tabIndex="-1" aria-hidden />
    )
  }
}

NotifApi.defaultProps = {
  sound:true
};

NotifApi.propTypes = {
  onRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]),
  active: PropTypes.bool,
  body: PropTypes.string,
  data: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
  interaction: PropTypes.bool,
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.func
  ]),
  timeout: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  vibrate: PropTypes.array,
  sound: PropTypes.bool,
  onClick: PropTypes.func,
  onError: PropTypes.func
};

/*
{sound ? 
  <audio ref="notifSound" id="notifSound" hidden>
    <source src="sound/sound.mp3" type="audio/mpeg" />
    <source src="sound/sound.ogg" type="audio/ogg" />
  </audio> : null
}
*/

// sound.mp3
// sound.ogg
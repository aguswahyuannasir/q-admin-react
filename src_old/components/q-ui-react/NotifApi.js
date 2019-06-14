import React,{Component} from 'react';
import {bool, func, number, object, string, oneOfType} from 'prop-types';
//import Modal from 'react-bootstrap/Modal';
//import Btn from './Btn';

const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';

const seqGen = () => {
  let i = 0;
  return () => {
    return i++;
  };
};
const seq = seqGen();

export default class NotifApi extends Component{
  constructor(props){
    super(props);

    let supported = false;
    let granted = false;
    if(('Notification' in window) && window.Notification){
      supported = true;
      if(window.Notification.permission === PERMISSION_GRANTED){
        granted = true;
      }
    }

    this.state = {
      supported: supported,
      granted: granted,
			//modalConfirm: false
    };
    // Do not save Notification instance in state
    this.notifications = {};
    this.windowFocus = true;
    this.onWindowFocus = this._onWindowFocus.bind(this);
    this.onWindowBlur = this._onWindowBlur.bind(this);
  }

  _onWindowFocus(){
    this.windowFocus = true;
  }

  _onWindowBlur(){
    this.windowFocus = false;
  }

  _askPermission(){
    window.Notification.requestPermission((permission) => {
      let result = permission === PERMISSION_GRANTED;
			
      this.setState({
        granted: result
      },() => {
        if(result){
          this.props.onPermissionGranted();
        }else{
          this.props.onPermissionDenied();
        }
      });
    });
  }

  componentDidMount(){
		const {disableActiveWindow, confirmNotif, notSupported, onPermissionGranted, askAgain, onPermissionDenied} = this.props;
		
		// Q-CUSTOM = FOR modal confirm notification first time
		const toModal = () => {		
			if(confirmNotif){
				//setTimeout(() => {
					confirmNotif();
				//},500);
			}
		}
		
    if(disableActiveWindow){
      window.addEventListener('focus', this.onWindowFocus);
      window.addEventListener('blur', this.onWindowBlur);
    }

    if(!this.state.supported){
      notSupported();
    }else if(this.state.granted){
      onPermissionGranted();
    }else{
      if(window.Notification.permission === PERMISSION_DENIED){
        if(askAgain){
          this._askPermission();
					
					toModal();
        }else{
          onPermissionDenied();
        }
      }else{
        this._askPermission();
				
				toModal();
      }
    }
  }

  componentWillUnmount(){
    if(this.props.disableActiveWindow){
      window.removeEventListener('focus', this.onWindowFocus);
      window.removeEventListener('blur', this.onWindowBlur);
    }
  }
	
  close(n){
    if(n && typeof n.close === 'function'){
      n.close();
    }
  }

// for debug
  _getNotificationInstance(tag){
    return this.notifications[tag];
  }
	
  render(){
    let doNotShowOnActiveWindow = this.props.disableActiveWindow && this.windowFocus;
    if(!this.props.ignore && this.props.title && this.state.supported && this.state.granted && !doNotShowOnActiveWindow){
      let opt = this.props.options;
      if(typeof opt.tag !== 'string'){
        opt.tag = 'web-notification-' + seq();
      }

      if(!this.notifications[opt.tag]){
        if(this.props.swRegistration && this.props.swRegistration.showNotification){
          this.props.swRegistration.showNotification(this.props.title, opt)
          this.notifications[opt.tag] = {};
        }else{
          const n = new window.Notification(this.props.title, opt);
          n.onshow = e => {
            this.props.onShow(e, opt.tag);
            setTimeout(() => {
              this.close(n);
            }, this.props.timeout);
          };
          n.onclick = e => {this.props.onClick(e, opt.tag); };
          n.onclose = e => {this.props.onClose(e, opt.tag); };
          n.onerror = e => {this.props.onError(e, opt.tag); };

          this.notifications[opt.tag] = n;
        }
      }
    }

// return null cause
// Error: Invariant Violation: Notification.render(): A valid ReactComponent must be returned. You may have returned undefined, an array or some other invalid object.
// style={{display:'none'}}
		return (
			<input type="hidden" />
    );
  }
}

NotifApi.propTypes = {
  ignore: bool,
  disableActiveWindow: bool,
  askAgain: bool,
  notSupported: func,
  onPermissionGranted: func,
  onPermissionDenied: func,
  onShow: func,
  onClick: func,
  onClose: func,
  onError: func,
  timeout: number,
  title: string.isRequired,
  options: object,
  swRegistration: object,
	
	// Q-CUSTOM
	confirmNotif: oneOfType([
		bool,
		func
	])
};

NotifApi.defaultProps = {
  ignore: false,
  disableActiveWindow: false,
  askAgain: false,
  notSupported: () => {},
  onPermissionGranted: () => {},
  onPermissionDenied: () => {},
  onShow: () => {},
  onClick: () => {},
  onClose: () => {},
  onError: () => {},
  timeout: 5000,
  options: {},
  swRegistration: null
};

// export default Notification;
import React,{Component, createContext, Fragment} from 'react';// , lazy, Suspense
//import {string, number, bool, oneOfType, instanceOf} from 'prop-types';// PropTypes
//import {addEvent, removeEvent} from '../../utils/Qutils';

import NotifApi from '../components/q-ui-react/NotifApi';
import Modal from 'react-bootstrap/Modal';
import Btn from '../components/q-ui-react/Btn';
import {getOsVersion, addEvent, removeEvent} from '../components/utils/Qutils';// 
import {Get} from "../components/axios/Api";
import Head from '../app-part/Head';

// ContextNotif
const Context = createContext();

// Provider | ProviderNotif
const ProviderApp = Context.Provider;

//const NotifApi = lazy(() => import('../components/q-ui/NotifApi'));

const ContextApp = (Child) => { // , selectData
  // ...and returns another component...
  return class extends Component{
    constructor(props){
      super(props);
      this.state = {
				isOnline: true,
				type: null, // Network type that browser uses
				downlink: null, // Effective bandwidth estimate - 'Mb/s'
				downlinkMax: null, // Upper bound on the downlink speed of the first network hop - 'Mb/s'
				
				// Effective connection type determined using a combination of recently
				// observed rtt and downlink values: ' +
				effectiveType: null, // "4g",
				
				onchange: null,
				rtt: null, // Effective round-trip time estimate - 'ms'
				saveData: null,
				
				lang: "id",// FOR Setting app language
				ignore: true,
				title: "",
				sound: true,
				addTitle: false,
				modalConfirm: false,
				
				userData: [], // FOR user session / token | [] (NOT FIX first initialState)
				
				// GLOBAL datas:
				datas: null
      };
			
			this.audio = null;// Q-CUSTOM FOR notif sound
			this.title = document.title;
			
			//console.log(typeof this.state.userData);
			//this.onXhr('/dummy_api/user_data.json', 'userData');
    }

    componentDidMount(){
			//console.log('componentDidMount in ContextApp - context\\ContextApp');
      // ... that takes care of the subscription...
			//console.log(getOsVersion("NT 10.0"));
			
			//this.onXhr('/dummy_api/user_data.json', 'userData');
			this.onNetConnection();
			this.netWorkInfo();
			
			addEvent(window,"online",this.onNetConnection);
			addEvent(window,"offline",this.onNetConnection);
			
			if(navigator.connection){
				addEvent(navigator.connection,'change', this.netWorkInfo);
			}
    }

    componentWillUnmount(){
			console.log('componentWillUnmount in ContextApp - contexts\\ContextApp');
      //window.removeEventListener("beforeunload", this.onBeforeUnload);
			//removeEvent(window, "beforeunload", this.onBeforeUnload);
			
			removeEvent(window,"online",this.onNetConnection);
			removeEvent(window,"offline",this.onNetConnection);
			
			if(navigator.connection){
				removeEvent(navigator.connection,'change', this.netWorkInfo);
			}
    }
		
		onNetConnection = () => {
			this.setState({isOnline: navigator.onLine});
		}
		
		netWorkInfo = () => {
			if(!navigator.connection){
				return;
			}
			
			let {type, downlink, downlinkMax, effectiveType, rtt, saveData} = navigator.connection;
			
			this.setState({
				type: type, // Network type that browser uses
				downlink: downlink, // Effective bandwidth estimate - 'Mb/s'
				downlinkMax: downlinkMax, // Upper bound on the downlink speed of the first network hop - 'Mb/s'
				
				// Effective connection type determined using a combination of recently
				// observed rtt and downlink values: ' +
				effectiveType: effectiveType, // "4g",
				
				onchange: null,
				rtt: rtt, // Effective round-trip time estimate - 'ms'
				saveData: saveData // True if the user has requested a reduced data usage mode from the user agent
			});
			
			//console.log(navigator.connection);
		}
		
		// FOR Xhr All
		onXhr = (url, state) => {
			//if(this.state.appInfo === null){
				Get(url).then(res => {
					if(res.status === 200){
						this.setState({[state]: res.data});// , () => console.log(this.state.userData)
					}
				}).catch(err => {
					console.log(err);
				}).then(() => {
					
				});
			//}
		}			
		
// FOR action trigger in to props
		dispatch = (action, data) => {			
			switch (action.type){
				case "SHOW_NOTIF":
					return this.showNotif(data);
					//break; 
				case "ON_NOTIF":
					return this.setState({ignore: false});
					//break;
				case "OFF_NOTIF":
					return this.setState({ignore: true});
					//break;
				case "ON_SOUND":
					return this.setState({sound: true});
					//break;
				case "OFF_SOUND":
					return this.setState({sound: false});
					//break;
				case "GET_DATA":
					return this.setState({datas: data});
				default: 
					break;
			}
		}
		
		showNotif = (data) => {
			if(this.state.ignore){
				return;
			}

			const now = Date.now();

			//const title = data.title; // 'React-Web-Notification' + now;
			//const body = data.body; // 'Hello' + new Date();
			// const tag = now;
			// const icon = data.icon; // '/img/at_building.jpg'
			// const icon = 'http://localhost:3000/Notifications_button_24.png';

			// Available options
			// See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
			const options = {
				tag: now, // tag,
				body: data.body, // body,
				icon: data.icon, // icon,
				lang: 'en',
				dir: 'ltr',
				
				// no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
				sound: "/sound/bip.wav" // './sound.mp3'
			}
			
			if(data.addTitle === true){
				//document.title = this.state.title;
				//console.log(document.title);
				
				this.setState({
					title: data.title, // title,
					options: options,
					addTitle: data.title // true
				});
			}
			else if(Number.isInteger(data.addTitle)){
				this.setState({
					title: `(${data.addTitle}) ${this.title}`, // `(${data.addTitle}) ${data.title}`, // title,
					options: options,
					addTitle: `(${data.addTitle})` // `(${data.addTitle}) ${this.title}` | true
				});
			}else{
				this.setState({
					title: data.title, // title,
					options: options
				});
			}
		}
		
	// DEV -  NotifApi
		onPermissionGranted = () => {
			//console.log('Permission Granted');
			this.setState({
				ignore: false,
				modalConfirm: false
			});
		}
		
		onPermissionDenied = () => {
			//console.log('Permission Denied');
			this.setState({
				ignore: true,
				modalConfirm: false
			});
		}
		
		onNotSupported = () => {
			console.log('Web Notification not Supported');
			this.setState({
				ignore: true,
				modalConfirm: false
			});
		}

		onNotifClick = (e, tag) => {
			e.target.close(tag);
			window.focus();
			//console.log(e, 'Notification clicked tag:' + tag);
		}

		onNotifError = (e, tag) => {
			console.log(e, 'Notification error tag:' + tag);
		}

		onNotifClose = (e, tag) => {
			//console.log(e, 'Notification closed tag:' + tag);
			if(this.state.addTitle){
				document.title = this.title;
				this.setState({addTitle: false});
			}
		}

		onNotifShow = (e, tag) => {
			// !getOsVersion("NT 6.2")  
			//console.log(!getOsVersion("NT 6.2") || !getOsVersion("NT 10.0"));
			
			//if(!getOsVersion("NT 6.2") || !getOsVersion("NT 10.0")){
				if(this.state.sound && !getOsVersion("NT 10.0")){
					if(this.audio === null){
						this.audio = new Audio("/sound/bip.wav");// tug.wav | sound.mp3"
					}
					this.audio.play();
				}
			//}
			//console.log(e, 'Notification shown tag:' + tag);
		}
	// END DEV- NotifApi
	
// Q-CUSTOM
		onModalConfirm = () => {
			this.setState(prevState => ({
				modalConfirm: !prevState.modalConfirm
			}));
		}

    render(){
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
			const {userData, ignore, title, addTitle, options, modalConfirm} = this.state;
			
			//console.log(userData);
			
			return (
				<ProviderApp 
					value={{
						stateContextApp: this.state,
						dispatch: this.dispatch
					}}
				>
					<Fragment>
						<Child {...this.props} />
						
						{addTitle && <Head title={addTitle} />}
            
						{/*<Suspense fallback={<div />}>*/}
							<NotifApi
								ignore={ignore && title !== ''}
								notSupported={this.onNotSupported}
								onPermissionGranted={this.onPermissionGranted}
								onPermissionDenied={this.onPermissionDenied}
								onShow={this.onNotifShow}
								onClick={this.onNotifClick}
								onClose={this.onNotifClose}
								onError={this.onNotifError}
								timeout={5000}
								title={title}
								options={options}
								
								// Q-CUSTOM
								confirmNotif={(!userData.notif && userData.role !== "guest") && ignore ? this.onModalConfirm : false}
							/>
						{/*</Suspense>*/}
						
						{(!userData.notif && ignore) && 
							<Modal
								size="sm"
								backdrop="static"
								keyboard={false}
								centered
								aria-labelledby="confirmNotification"
								show={modalConfirm}
								onHide={this.onModalConfirm}
								
								//onEntered={this.onEnteredModal}
								//onExited={this.onExitedModal}
							>
								<Modal.Header>
									<Modal.Title id="confirmNotification">
										Code editor
									</Modal.Title>
								</Modal.Header>
								
								<Modal.Body>
									<h4>Centered Modal</h4>
									<p>Cras mattis consectetur purus sit amet fermentum</p>
									<Btn size="sm" kind="info">Guide</Btn>
								</Modal.Body>
							</Modal>
						}
					</Fragment>
				</ProviderApp>
			)
    }
  };
}

// Consumer
const Consumer = Context.Consumer;

const ConsumerApp = (Child) => {
	return class extends Component{
		render(){
			return (
				<Consumer>
					{
						value => {
							return <Child {...this.props} {...value} />
						}
					}
				</Consumer>
			)
		}
	}
}

export {ContextApp, ConsumerApp};

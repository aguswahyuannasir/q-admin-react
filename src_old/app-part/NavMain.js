import React,{Component} from 'react';// Fragment
import {Navbar, NavbarBrand} from 'reactstrap';// NavbarToggler, Input, NavLink
import NavLg from './NavLg';
import Find from './Find';
//import InputGroup from 'react-bootstrap/InputGroup';
import A from '../components/q-ui-react/A';
//import BtnGroup from '../components/q-ui-react/BtnGroup';
//import Btn from '../components/q-ui-react/Btn';
import Img from '../components/q-ui-react/Img';
//import QdownShift from './QdownShift';
//import {isMobile} from '../components/utils/Qutils';// addEvent, removeEvent
			
//const getHashNav = window.location.hash;
			
export default class NavMain extends Component{
  /*constructor(props){
    super(props);
    this.state = {
      isOpen: false,
			navHash: getHashNav ? getHashNav : ""
			//isFind: false
    };
  }*/
	
	//componentDidMount(){		
		//console.log('componentDidMount in NavMain - app-part\\NavMain');
		/*const hash = window.location.hash;
    
		if(hash && hash === this.state.navHash){		
			this.setState({isOpen: true});
    }

    //window.addEventListener('hashchange', this.hashHandler, false);
		addEvent(window, 'hashchange', this.hashHandler, false);*/
	//}
	
	//componentWillUnmount(){
		//console.log('componentWillUnmount in NavMain - app-part\\NavMain');
		//window.removeEventListener('hashchange', this.hashHandler, false);
		//removeEvent(window, 'hashchange', this.hashHandler, false);
	//}
	
	/*componentDidUpdate(prevProps){
		console.log('componentDidUpdate in NavMain - app-part\\NavMain');
		console.log(this.props.locationRoute);
		
		console.log('props.hash: ',this.props.locationRoute.hash);
		console.log('window.location.hash: ',window.location.hash);
		console.log('isOpen: ',this.state.isOpen);
		let cek = (window.location.hash === this.props.locationRoute.hash && !this.state.isOpen) && !this.props.locationRoute.state;
		console.log('cek: ',cek);
		
		// this.props.locationRoute.state && this.props.locationRoute.state.fromNavMain
		//if(!this.props.locationRoute.state && this.props.locationRoute.hash === this.state.navHash){
		//	console.log('OK NIH');
		//}
	}*/
	
  /*hashHandler = () => {				
		if(window.location.hash !== this.state.navHash){
			this.setState({
				isOpen: false,
				navHash: ""
				//isFind: false
			});
		}
		
		let cek = (window.location.hash === this.props.locationRoute.hash && !this.state.isOpen) && !this.props.locationRoute.state;
		console.log('cek: ',cek);
		
		console.log(this.props.locationRoute);// .state.fromNavMain
			
		//}
  }*/
	
  /*onOpen = () => { // isFind
    this.setState(state => ({
			isOpen: !state.isOpen
		}),() => {
			let isOpenNow = this.state.isOpen;
			if(isOpenNow){
				window.location.hash = "#main-menu";
			}else{
				window.history.back();
			}
			
			this.setState({
				navHash: isOpenNow ? "#main-menu" : "",
				//isFind: isOpenNow && !isFind ? true : false
			});
		});
  }*/
	
	onClickToggleNav = e => {		
		if(e.target.classList.contains("active")){
			//e.preventDefault();
			//e.stopPropagation();
			//console.log(typeof document.referrer);
			//console.log(document.referrer);
			
			//if(document.referrer === ""){
				//window.history.pushState(null, null, window.location.origin);
				//window.location.assign(window.location.origin);
			//}else{
				window.history.back();
			//}
		}
	}
	
	netInfo(state, mobile){
		if(state){
			return (
				<div className={`btn btn-danger btn-sm${mobile ? "" : " align-self-center mr-2"} tip tipB`} aria-label="Offline">
					<svg baseProfile="full" width="17" height="17" viewBox="0 0 24.00 24.00" enableBackground="new 0 0 24.00 24.00">
						<path fill="white" fillOpacity="1" strokeWidth="1.33333" strokeLinejoin="miter" d="M 18,3L 18,16.1777L 21,19.1777L 21,3L 18,3 Z M 4.27734,5L 3,6.2676L 10.7324,14L 8,14L 8,21L 11,21L 11,14.2676L 13,16.2676L 13,21L 16,21L 16,19.2676L 19.7324,23L 21,21.7227L 4.27734,5 Z M 13,9L 13,11.1777L 16,14.1777L 16,9L 13,9 Z M 3,18L 3,21L 6,21L 6,18L 3,18 Z "/>
					</svg>
				</div>
			);
		}
	}
	
  render(){
		const {isNoMobile, stateContextApp, dispatch} = this.props;// children
		//const {isOpen} = this.state;// , isFind
		//console.log(dispatch);
		
    return (
			<Navbar dark color="primary" expand="md" className="sti-top" id="navMain">
				<NavbarBrand href="/">
					<Img circle w="25" imgClass="border border-white" alt="Logo" src="/img/cool.png" /> Q-Admin-React
				</NavbarBrand>
				
				{/*<NavbarToggler onClick={this.onOpen} />*/}
				
				{isNoMobile ? 
          <NavLg
            // location={location}
						stateContextApp={stateContextApp}
						dispatch={dispatch}
          >
            <Find
              id="findMain"
              size="sm"
              elClass="mr-2 findMain"
              outline
              kind="light"
              inputClass="form-control-sm"
              api="https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query="
            />

						{this.netInfo(!stateContextApp.isOnline, false)}
          </NavLg>
					:
					<div className="dflex d-lg-none">
						{this.netInfo(!stateContextApp.isOnline, true)}
						
						<A 
							//onClick={this.onClickFind} 
							//htmlFor="findMain"
							// btn btn-outline-light btnFindMain 
							dom 
							noCtxMenu
							//href="/search"
							href={{
								pathname: "/search",
								//search: "?app=main-menu",
								state: {findMain: true}
							}}
							btn="outline-light"
							aClass="mx-2 i ion-ios-search scale15" tip="Go to Search" 
							aria-current="true" // OPTION
							onClick={this.onClickToggleNav}
						/>
						
						<A 
							dom 
							noCtxMenu
							//href="/main-menu"
							href={{
								pathname: "/main-menu",
								//search: "?app=main-menu",
								state: {mainMenu: true}
							}}
							aClass="navbar-toggler navTogRoute"
							role="button"
							
							//onContextMenu={this.noContextMenu}
							onClick={this.onClickToggleNav}
						>
							<span className="navbar-toggler-icon" />
						</A>
						
						{/*<NavbarToggler onClick={this.onOpen} />*/}
					</div>
				}
			</Navbar>
    );
  }
}
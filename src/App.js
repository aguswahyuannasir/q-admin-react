import React,{Component,Fragment} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";// Redirect, Link
import {Row, Col} from 'reactstrap';
import {isMobile} from './components/utils/Qutils';// setStorage, addEvent
import NavMain from './app-part/NavMain';
import AsideMain from './app-part/AsideMain';

import {ContextApp, ConsumerApp} from './context/ContextApp';

// RouteWithSubRoutes

// Pages:
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ContactUs from './pages/ContactUs';
import Reports from './pages/Reports';
import Emails from './pages/Emails';
import Articles from './pages/Articles';

import UsersInput from './pages/inputs/UsersInput';
import EmailInput from './pages/inputs/EmailInput';
import ArticlesInput from './pages/inputs/ArticlesInput';

// General pages:
import LinkMenu from './pages/general/LinkMenu';

// Dev Pages:
import DevFileMaker from './pages/dev/DevFileMaker';
import DevVttMaker from './pages/dev/DevVttMaker';

import NotFound from './pages/NotFound';

import {BoxPortal, ConsumerPortal} from './components/q-ui-react/box/BoxPortal';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
			//userData: null,
      seeDialog: false
    };

    this.prevLocation = this.props.location;
  }
	
  componentDidMount(){
    console.log(`%cWelcome to Q-Admin-React\n`,"color:#666;font-family:Arial;letter-spacing:.02em;font-size:x-large;text-shadow:2px 2px 0 #A0E7FE,3px 3px 1px rgba(0,0,0,.3);");

    // // SET language to localStorage
		// if(navigator && navigator.cookieEnabled && window.localStorage){
		// 	setStorage('lang',document.documentElement.lang);
		// }
		
		/*this.setState({
			userData: {
				id: 1, username: "Q-think", email: "m.husein27@gmail.com"
			}
		});*/
		
		this.props.dispatch({type: "SET_BOX_WIDTH"}, null, 512);
		//this.props.dispatch({type: "SET_TITLE"}, 'New Article');
  }
	
  shouldComponentUpdate(nextProps, nextState){ // componentDidUpdate(prevProps) | componentWillUpdate(nextProps)
    let {location} = this.props;

    // set prevLocation if props.location is not modal
    if(nextProps.history.action !== "POP" && (!location.state || !location.state.view)){
      this.prevLocation = this.props.location;
    }
    return true;
  }

  componentDidUpdate(prevProps){ // ,prevState
    const {location} = this.props;

		if(location.pathname !== prevProps.location.pathname && !location.pathname.includes('/view/')){
      window.scrollTo(0,0);
			// console.log('if componentDidUpdate App');
    }

    // FOR close dropdown-menu with dropdown-item react-router NavLink / Link component
    const btn = document.activeElement;
		if(btn.classList.contains("ddRoute")){
			btn.click();
			btn.blur();
			//document.body.click();
		}
    // if(btn.classList.contains("btn")){
    //   btn.blur();
    // }
  }
	
  onDialog = () => {
    this.setState(state => ({
      seeDialog: !state.seeDialog
    }));
  }
	
	render(){
		let {location, stateContextApp, dispatch} = this.props;// userData, match
		let isModal = !!(location.state && location.state.view && this.prevLocation !== location);// not initial render
		
		return (
			<Fragment>
        <NavMain
          //locationRoute={location}
          isNoMobile={!isMobile()}
          stateContextApp={stateContextApp}
          dispatch={dispatch}
        />
				

				<Row noGutters>
					<AsideMain location={location} />
					
					<Col tag="main" 
						md="10" 
						// className="px-3" // container-fluid
					>
						<Switch location={isModal ? this.prevLocation : location}>
							{/* userData && <Redirect to="/admin" /> */}
						
							<Route path="/" exact component={Dashboard} />
							
							<Route path="/users" component={Users} />
							<Route path="/contact-us" component={ContactUs} />
							<Route path="/reports" component={Reports} />
							<Route path="/emails" render={() => <Emails dispatch={dispatch} />} />
							<Route path="/articles" render={() => <Articles dispatch={dispatch} />} />
							
							<Route path="/input-data/users-inputs" component={UsersInput} />
							<Route path="/input-data/emails-inputs" component={EmailInput} />
							<Route path="/input-data/articles-inputs" component={ArticlesInput} />
							
							<Route path="/dev/file-maker" component={DevFileMaker} />
							<Route path="/dev/vtt-maker" component={DevVttMaker} />
							
							<Route path="/general/add-url-link" component={LinkMenu} />
							
							<Route component={NotFound} />
						</Switch>
						
						{/* isModal ? <Route path="/view/:id" component={View} /> : null */}
					</Col>
				</Row>
			</Fragment>
		);
	}
}

const BoxSet = BoxPortal(ConsumerPortal(App));

const Apps = ConsumerApp(BoxSet);

function WebApp(){
  return (
    <Router>
      <Route component={Apps} />
    </Router>
  );
}

export default ContextApp(WebApp);// 
// export default App;

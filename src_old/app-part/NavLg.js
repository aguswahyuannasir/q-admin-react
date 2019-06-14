import React,{Component} from 'react';//
// NavItem, NavbarToggler, Input, NavLink
import {Collapse, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
//import InputGroup from 'react-bootstrap/InputGroup';
import {winLoc} from '../components/utils/Qutils';
import A from '../components/q-ui-react/A';
//import Btn from '../components/q-ui-react/Btn';
// import BtnGroup from '../components/q-ui-react/BtnGroup';
//import Btn from '../components/q-ui-react/Btn';
//import QdownShift from './QdownShift';

export default class NavLg extends Component{
	/*constructor(props){
		super(props);
		this.state = {
			lang: "id"
		};

	}*/
	//console.log(winLoc.search.length);

	componentDidMount(){
		//console.log('componentDidMount in NavLg - app-part\\NavLg');
		this.getHl();
	}

	getHl = () => {
		let params = new URLSearchParams(winLoc.search);
		let getLang = params.get("hl");

		//this.setState({lang: !getLang || getLang === 'id' ? 'id' : 'en'});
		let langNow = !getLang || getLang === 'id' ? 'id' : 'en';
		//console.log(langNow);
		this.props.dispatch({type: "CHANGE_LANG"},langNow);

		//if(getLang === lang || main) return true; // winLoc.search.length < 1
		//return false;
	}

	setLang = (e, lang) => {
		if(e.target.classList.contains("i")){
			//e.preventDefault();
			//e.stopPropagation();
			return;
		}
		this.props.dispatch({type: "CHANGE_LANG"},lang);
	}

	render(){
		//const {lang} = this.state;
		const {children, stateContextApp} = this.props;
		//console.log(stateContextApp);

		return (
			<Collapse isOpen={false} navbar className="offcanvas fullMenu">
				{/* children */}

				<Nav tag="div" className="ml-auto" navbar>
					{children}

					<UncontrolledDropdown tag="div" nav inNavbar>
						<DropdownToggle nav caret tag="div" className="ddRoute" role="button" tabIndex="0">Info</DropdownToggle>
						<DropdownMenu right>
							<A dom href={`/tentang-kami`} aClass="dropdown-item">Tentang kami</A>
							<A dom href={`/hubungi-kami`} aClass="dropdown-item">Hubungi kami</A>
							<hr className="my-2" />
							<DropdownItem>FAQ</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>

					<UncontrolledDropdown tag="div" nav inNavbar className="mx-2">
						<DropdownToggle nav caret tag="div" className="ddRoute" role="button" tabIndex="0">Bahasa</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem header>Pilih bahasa:</DropdownItem>
							<A
								dom="link"
								replace
								href={`${winLoc.pathname}`} // ?hl=id
								aClass={`dropdown-item${stateContextApp.lang === 'id' ? ' i ion-md-checkmark' : ''}`}
								onClick={(e) => this.setLang(e, "id")}
							>Indonesia</A>

							<A
								dom="link"
								replace
								href={`${winLoc.pathname}?hl=en`}
								aClass={`dropdown-item${stateContextApp.lang === 'en' ? ' i ion-md-checkmark' : ''}`}
								onClick={(e) => this.setLang(e, "en")}
							>English</A>
						</DropdownMenu>
					</UncontrolledDropdown>

					<div className="form-inline">
						{/*<Btn data-href="/login" kind="light" size="sm">Logout</Btn>*/}
						<UncontrolledDropdown inNavbar className="mr-2">
				      <DropdownToggle size="sm" color="light" className="i ion-md-add scale12 ddRoute" title="Add" />
				      <DropdownMenu right>
<DropdownItem onClick={(e) => this.props.dispatch({type: "OPEN_BOX"}, null, {title: 'New Message'})} className="i ion-md-mail">Compose Email</DropdownItem>
								<A dom href={`/input-data/users-inputs`} aClass="dropdown-item i ion-md-person-add">Add Users</A>
<DropdownItem onClick={(e) => this.props.dispatch({type: "OPEN_BOX"}, null, {title: 'New Article'})} className="i ion-md-create">Add Articles</DropdownItem>
								{/*<A dom href={`/input-data/articles-inputs`} aClass="dropdown-item i ion-md-create">Add Articles</A>*/}

				      </DropdownMenu>
				    </UncontrolledDropdown>

						<UncontrolledDropdown inNavbar>
				      <DropdownToggle caret size="sm" color="light" className="ddRoute">Username</DropdownToggle>
				      <DropdownMenu right>
				        <A dom href={`/profile/user_id`} aClass="dropdown-item">Profile</A>
				        <hr className="my-2" />
								<A dom href={`/admin/settings`} aClass="dropdown-item">Settings</A>
				        <DropdownItem>Logout</DropdownItem>
				      </DropdownMenu>
				    </UncontrolledDropdown>
					</div>


				</Nav>
			</Collapse>
		)
	}
}

//export default BoxPortal(ConsumerPortal(NavLg));

/*
<Nav navbar>
	<UncontrolledDropdown tag="div" nav inNavbar>
		<DropdownToggle nav caret tag="div" className="ddRoute" role="button" tabIndex="0">Produk</DropdownToggle>
		<DropdownMenu>
			<A dom href="/laundry" aClass="dropdown-item i ion-ios-shirt">Laundry</A>
			<A dom href="/catering" aClass="dropdown-item i ion-md-restaurant">Catering</A>
			<hr className="my-2" />
			<DropdownItem>Info</DropdownItem>
		</DropdownMenu>
	</UncontrolledDropdown>

	<NavItem>
		<A dom href="/artikel" aClass="nav-link">Artikel</A>
	</NavItem>
</Nav>
*/

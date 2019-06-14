import React,{Component} from 'react';// ,Fragment
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
// import {Col} from 'reactstrap';
import {MENUS} from '../routes';
import A from '../components/q-ui-react/A';

export default class AsideMain extends Component{
	constructor(props){
		super(props);
		this.state = {
			menus: MENUS,
			//tabKey: null
		};
	}
	
	//componentDidMount(){
		//console.log('componentDidMount in AsideMain - src\\pages\\AsideMain');
		// DEV - NOT FIX FOR open collase menu
		/*const {location} = this.props;
		let dataUrl = location.pathname.split('/')[1];
		let parentMenu = this.aside.firstElementChild.querySelector(`[data-url='/${dataUrl}']`);
		console.log(dataUrl);
		if(location.pathname.includes(dataUrl) && parentMenu){
			parentMenu.click();
		}*/
		//console.log(location);
	//}
	
  componentDidUpdate(prevProps){ // ,prevState
		//if(location.pathname !== prevProps.location.pathname && !location.pathname.includes('/view/')){ 
			// console.log('if componentDidUpdate App');
    //}
		
		// DEV - NOT FIX FOR open collase menu
		const {location} = this.props;
		let dataUrl = location.pathname.split('/')[1];
		let cardHeader = this.aside.firstElementChild.querySelector(`[data-url='/${dataUrl}']`);
		
		setTimeout(() => {
			if((location.pathname.includes(dataUrl) && cardHeader) && !cardHeader.previousElementSibling.classList.contains('show')){
				//console.log('componentDidUpdate in AsideMain - src\\pages\\AsideMain');
				//console.log(dataUrl);
				cardHeader.click();
			}
		},1);
	}
	
	//onClickParent = (e) => {
		//let et = e.target;
		//setTimeout(() => {
			/*let next = et.nextElementSibling;
			let ico = et.firstElementChild;
			console.log(next);
			
			if(next.classList.contains('show')){
				ico.classList.replace('ion-ios-arrow-forward','ion-ios-arrow-down');
			}else{
				ico.classList.replace('ion-ios-arrow-down','ion-ios-arrow-forward');
			}*/
		//},500);
	//}
	
	render(){
		const {menus} = this.state;
		//console.log(menus);
		
		return (			
			<aside ref={c => {this.aside = c}} className="col-md-2 asideMain">
				<Accordion 
					className="leftMenu" 
					// defaultActiveKey="0"
				>
					{(menus && menus.length > 0) && 
						menus.map((v, i) => 
							v.kids && v.kids.length > 0 ? 
								<Card key={i}>
									<Accordion.Collapse eventKey={v.id}>
										<div className="nav flex-column">
											{v.kids.map((val, id) => 
												<A key={id} dom href={v.url + val.url} aClass="nav-link i ion-md-arrow-dropright">{val.txt}</A>
											)}
										</div>
									</Accordion.Collapse>
									
									<Accordion.Toggle as={Card.Header} eventKey={v.id} 
										data-url={v.url} 
										// onClick={this.onClickParent}
										// className="i ion-ios-settings scale12"
									> {v.txt} <i className="i ion-ios-arrow-forward" />
									</Accordion.Toggle>
								</Card>
								:
								<A key={i} dom href={v.url} aClass="nav-link">{v.txt}</A>
							
						)
					}
				</Accordion>
			</aside>
		)
	}
}

/* 
										<A dom href="/users" aClass="nav-link">Users</A>
										<A dom href="/contacts" aClass="nav-link">Contacts</A>
										<A dom href="/reports" aClass="nav-link">Reports</A>
										
			<Accordion defaultActiveKey="0">
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">
						Click me!
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>Hello! I'm the body</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="1">
						Click me!
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="1">
						<Card.Body>Hello! I'm another body</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
*/

import React,{Component,Fragment} from 'react';
import Head from "../../app-part/Head";
import {Row, Col} from 'reactstrap';
import Flex from '../../components/q-ui-react/Flex';
// import A from '../../components/q-ui-react/A';
import Btn from '../../components/q-ui-react/Btn';
import Badge from '../../components/q-ui-react/Badge';
import Qswal from '../../components/q-ui-react/Qswal';

/* const initForm = {
	id: "", 
	role: "", 
	publish: "", 
	parent: "", 
	name: "", 
	url: "", 
	component: "", 
	props: ""
};*/

export default class LinkMenu extends Component{
  constructor(props){
    super(props);
		
		this.initForm = {
			id: "", 
			role: "", 
			publish: "", 
			parent: "", 
			name: "", 
			url: "", 
			component: "", 
			props: ""
		};
		
    this.state = {
      urls: [],
			isEdit: false,
			// formEdit: {

			// }
			...this.initForm
    };
  }
	
	componentDidMount(){
		console.log('componentDidMount in LinkMenu - src\\pages\\LinkMenu');
		this.setState({
			urls: [
				{id: 1, role:"All", publish:"Yes", parent:"", name:"Home", url:"/home", component:"", props:""},
				{id: 2, role:"User", publish:"Yes", parent:"", name:"Profile", url:"/profile", component:"", props:""},
				{id: 3, role:"Admin", publish:"No", parent:"Yes", name:"Articles", url:"/articles", component:"", props:""}
			]
		});
	}

	formGroup({id, txt, type, req, option, info, ...attr}){
		//console.log(info);
		return (
			<Row className="form-group">
				<label 
					htmlFor={id} 
					className="col-sm-4 col-form-label" 
				><span className={info ? "chelp i ion-md-information-circle tip tipT" : undefined} aria-label={info}> {txt}</span></label>
				<Col sm="8">
					{type === 'select' ? 
						<select className="custom-select" id={id} required={req} {...attr}>
							{option}
						</select>
						:
						<input className="form-control" id={id} type={type} required={req} {...attr} />
					}
				</Col>
			</Row>
		)
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();

		let et = e.target;
		
		if(et.checkValidity()){
			et.classList.remove('was-validated');
			
			// RESET form
			setTimeout(() => {
				//et.querySelector('.btn[type="reset"]').click();
				et.reset();
				console.log('onSubmit success');
			},9);
		}else{
			et.classList.add('was-validated');
			console.warn('onSubmit error');
		}
	}
	
	onDelete(i){
		const {urls} = this.state;
		let getItem = urls[i];
		
		Qswal.fire({
			title: 'Are you sure?',
			text: `to delete - ${getItem.name}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		})
		.then(res => {
			if(res.value){
				/*Qswal.fire(
					'Deleted!', '',
					'success'
				)*/
				// Ajax Here...
				
				// Delete in state
				urls.splice(i, 1);
				this.setState({urls});
			}
		});
	}
	
	onChangeInput = (e, to) => {
		this.setState({[to]: e.target.value});
	}
	
	render(){
		const {urls, isEdit, id, role, publish, parent, name, url, component, props} = this.state;// , formEdit
		
		return (
			<Fragment>
				<Head
					title="Link / Menu Input"
				/>			
			
				<div className="pt-3 px-3">
					<h6>Link / Menu input</h6>
					
					<Row form>
						<Col md="7">
							<form onSubmit={this.onSubmit} className="card" noValidate>
								<Flex as="h6" justify="between" align="center" elClass="card-header">
									Click info button for detail information. 
									<Btn size="sm" kind="info">Info</Btn>
								</Flex>
								
								<div className="card-body"
									// id, txt, type, req, option, info
								>
									{this.formGroup({id:'role', txt:'Role', type:'select', req:true, info:'Setting who can access this link', 
										option:['All','Admin','User'].map((v, i) => <option key={i} value={v}>{v}</option>),
										value: role,
										onChange: (e) => this.onChangeInput(e, 'role')
									})}
									
									{this.formGroup({id:'publish', txt:'Publish', type:'select', req:true, info:'Setting to publish', 
										option: ['No','Yes'].map((v, i) => <option key={i} value={v}>{v}</option>),
										value: publish,
										onChange: (e) => this.onChangeInput(e, 'publish')
									})}
									
									{this.formGroup({id:'parent', txt:'Parent', type:'select', req:true, info:'Setting this link to parent menu', 
										option:['No','Yes'].map((v, i) => <option key={i} value={v}>{v}</option>),
										value: parent,
										onChange: (e) => this.onChangeInput(e, 'parent')
									})}
									
									{this.formGroup({id:'name', txt:'Name', type:'text', req:true, info:'Link display name / text',
										value: name,
										onChange: (e) => this.onChangeInput(e, 'name')
									})}
								
									{this.formGroup({id:'url', txt:'Url', type:'text', req:true, info:'Setting link / url browser',
										value: url,
										onChange: (e) => this.onChangeInput(e, 'url')
									})}
									
									{this.formGroup({id:'componentPage', txt:'Page', type:'text', req:true, info:'Page to render',
										value: component,
										onChange: (e) => this.onChangeInput(e, 'component')
									})}
									
									{this.formGroup({id:'props', txt:'Properties', type:'text', req:true, info:'Setting page properties',
										value: props,
										onChange: (e) => this.onChangeInput(e, 'props')
									})}
									
									<div className="text-right">
										{isEdit && <Btn onClick={() => this.setState({isEdit: false, ...this.initForm})} type="reset">Cancel</Btn>}
										{' '}<Btn kind="primary" type="submit">Save</Btn>
									</div>
								</div>
							</form>
						</Col>
						
						<Col md="5">
							<div className="card">
								<Flex justify="between" align="center" elClass="card-header bg-light bold position-sticky zi-2" style={{top:48}}>
									List Link / Menu 
								</Flex>
								<ul className="list-group list-group-flush"
									// {id: 3, role:"", publish:"", parent:true, name:"Articles", url:"", component:"", props:""}
								>
									{urls.length > 0 ? 
										urls.map((v, i) => 
											<Flex key={i} as="li" justify="between" align="center" elClass={`list-group-item${id === v.id ? " active" : ""}`}>
												<div>
													<Badge 
														kind={v.publish !== "No" ? "info" : undefined} 
														className={`i ion-md-${v.publish !== "No" ? "checkmark" : "close"} chelp tip tipT`}  
														aria-label={v.publish !== "No" ? "Publish" : "No Publish"} 
													/> {v.name}
												</div>
												<div>
													<Btn 
														onClick={() => this.setState({isEdit: true, ...v})} 
														size="sm" 
														kind="info"
													>Edit</Btn>{' '}
													
													<Btn onClick={() => this.onDelete(i)} size="sm" disabled={isEdit && id === v.id}>Delete</Btn>
												</div>
											</Flex>
										)
										:
										<li className="list-group-item">
											Don't have Link / Url
											<small className="form-text text-muted">Fill form to add new link / url</small>
										</li>
									}
								</ul>
							</div>
						</Col>
					</Row>
				</div>
			</Fragment>
		)
	}
}

/*
id: v.id, 
role: v.role, 
publish: v.publish, 
parent: v.parent, 
name: v.name, 
url: v.url, 
component: v.component, 
props: v.props

Array.from({length: 15}).map((v, i)

					<Flex dir="row" justify="between" elClass="mb-2">
						<h6>Link / Menu input</h6>
						<A dom="link" href="/users" size="sm" btn="primary" aClass="i ion-md-people scale12">Show Users</A>
					</Flex>
*/
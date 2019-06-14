import React,{Component,Fragment} from 'react';
import Head from "../../app-part/Head";
//import {EditorState} from 'draft-js';
//import {Editor} from 'react-draft-wysiwyg';
//import uploadImageCallBack from '../../components/wysiwyg/uploadImageCallBack';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import AsideMain from '../app-part/AsideMain';
import {Row, Col} from 'reactstrap';
import Flex from '../../components/q-ui-react/Flex';
import A from '../../components/q-ui-react/A';
import Btn from '../../components/q-ui-react/Btn';

export default class UsersInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      //editorState: EditorState.createEmpty(),
    };
  }
	
	componentDidMount(){
		console.log('componentDidMount in UsersInput - src\\pages\\UsersInput');
		
	}

	formGroup(id, label, type, required, option){
		return (
			<Row className="form-group">
				<label htmlFor={id} className="col-sm-3 col-form-label">{label}</label>
				<Col sm="9">
					{type === 'select' ? 
						<select className="custom-select" id={id} required={required}>
							{option}
						</select>
						:
						<input type={type} className="form-control" id={id} required={required} />
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
	
	render(){
		//const {editorState} = this.state;
		
		return (
			<Fragment>
				<Head
					title="Users Input"
				/>			
			
				<div className="pt-3 px-3">
					<Flex dir="row" justify="between" elClass="mb-2">
						<h6>Users input</h6>
						<A dom="link" href="/users" size="sm" btn="primary" aClass="i ion-md-people scale12">Show Users</A>
					</Flex>
					
					<Row form>
						<Col md="9">
							<form onSubmit={this.onSubmit} className="card" noValidate>
								<div className="card-body">
									{this.formGroup('role', 'Role', 'select', true, 
										['','Admin','User'].map((v, i) => <option key={i} value={v}>{v}</option>)
									)}
									
									{this.formGroup('active', 'Active', 'select', true, 
										['','Active','No Active'].map((v, i) => <option key={i} value={v}>{v}</option>)
									)}
									
									{this.formGroup('username', 'Username', 'text', true)}
								
									{this.formGroup('userEmail', 'Email', 'email', true)}
									
									{this.formGroup('userPass', 'Password', 'password', true)}
									
									{this.formGroup('userConfirmPass', 'Confirm Password', 'password', true)}
									
									<div className="text-right">
										<Btn type="reset">Reset</Btn>{' '}
										<Btn kind="primary" type="submit">Save</Btn>
									</div>
								</div>
							</form>
						</Col>
						
						<Col md="3">
							<div className="card">
								<div className="card-body">
									Info
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</Fragment>
		)
	}
}
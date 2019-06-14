import React,{Component,Fragment} from 'react';
import Head from "../app-part/Head";
//import Card from 'react-bootstrap/Card';
//import AsideMain from '../app-part/AsideMain';
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';// Table, 
import Modal from 'react-bootstrap/Modal';
import Flex from '../components/q-ui-react/Flex';
import A from '../components/q-ui-react/A';
import BtnGroup from '../components/q-ui-react/BtnGroup';
import Btn from '../components/q-ui-react/Btn';
import CheckBox from '../components/q-ui-react/CheckBox';
import Qswal from '../components/q-ui-react/Qswal';

export default class Users extends Component{
  constructor(props){
    super(props);
    this.state = {
      datas: [
				{id: 1, first_name: "Muhamad", last_name: "Husein", username: "Q-think"},
				{id: 2, first_name: "Angelina", last_name: "Jolie", username: "Jolie"},
				{id: 3, first_name: "Imogen", last_name: "Pots", username: "Imogen"},
				{id: 4, first_name: "Brad", last_name: "Pitt", username: "Brad"},
			],
			tbodyWidth: [],
			modalEdit: false,
			toEdit: null
    };
  }
	
	componentDidMount(){
		console.log('componentDidMount in Users - src\\pages\\Users');
		
		let td = this.table.firstElementChild.firstElementChild.children;
		let tdWidth = [];
		
		for(let i = 0; i < td.length; i++){
			//if(i === 4) tdWidth.push(td[i].offsetWidth - 1);//  - 3
			//if(i !== 0 && i !== 4) tdWidth.push(td[i].offsetWidth + 1); // else if(i !== 0) tdWidth.push(td[i].offsetWidth + 1);
			//else tdWidth.push(td[i].offsetWidth - 1);
			tdWidth.push(td[i].offsetWidth);
		}
		
		this.setState({
			tbodyWidth: tdWidth
		});
	}
	
	setEdit = (open, i) => {
		//const	{datas} = this.state;
		
		//console.log(getUser);
		
		//getUser.edit = true;
		//console.log(getUser);
		
		/*const toEdit = {
			id: i,
			first_name: getUser.first_name,
			last_name: getUser.last_name,
			username: getUser.username
		};*/

		//datas.splice(i, 1);
		//datas.unshift(getUser);
		
    this.setState(state => ({
			//datas
      modalEdit: open,
			toEdit: typeof i === 'number' ? this.state.datas[i] : null
    }));
	}
	
	saveEdit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('saveEdit');
		
		let fD = new FormData(e.target);
		for(let pair of fD.entries()){
			console.log(pair[0]+ ', '+ pair[1]); 
		}
	}
	
	onDelete(i){
		const {datas} = this.state;
		let getUser = datas[i];
		
		Qswal.fire({
			title: 'Are you sure?',
			text: `to delete user - ${getUser.username}`,
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
				datas.splice(i, 1);
				this.setState({datas});
			}
		});
	}
	
	render(){
		const {datas, tbodyWidth, modalEdit, toEdit} = this.state;
		
		return (
			<Fragment>
				<Head
					title="Users"
				/>
			
				<div className="pt-3 px-3">
					<Flex dir="row" justify="between" elClass="mb-2">
						<h6>Users - Total ({datas.length})</h6>
						<A dom="link" href="/input-data/users-inputs" size="sm" btn="primary" aClass="i ion-md-person-add scale12">Add Users</A>
					</Flex>
					
					<div className="table-responsive q-table" style={{height:'calc(100vh - 105px)'}}>
						<Flex dir="row" align="stretch" elClass="q-thead">
							<div style={{width: tbodyWidth[0]}}>
								<UncontrolledButtonDropdown inNavbar>
									<DropdownToggle size="sm" caret color="fff">ID</DropdownToggle>
									<DropdownMenu>
										{/*<CheckBox 
											labelClass="py-1 px-3" 
											onChange={this.onCheckAll} 
											id="checkAll"
											label="All"
											val="All"
											checked={checkAll}
										/>*/}
										
										{['All','None','Read','Unread','Starred','Unstarred'].map((v, i) => 
											<CheckBox key={i} noSelect labelClass="py-1 px-3" id={v} label={v} val={v} />
										)}
									</DropdownMenu>
								</UncontrolledButtonDropdown>
							</div>
							<div style={{width: tbodyWidth[1]}}>First Name</div>
							<div style={{width: tbodyWidth[2]}}>Last Name</div>
							<div style={{width: tbodyWidth[3]}}>Username</div>
							<div style={{width: tbodyWidth[4]}}>Action</div>
						</Flex>
						
						<table ref={c => {this.table = c}} className="table table-sm table-striped table-hover tb-contacts"
							//  table-bordered
						>
							<tbody>
								{datas.map((v, i) => 
								<tr key={i}>
									<th scope="row">
										<CheckBox 
											noSelect 
											// display="inline-flex" 
											labelClass="p-2" 
											// onChange={this.onCheckAll} 
											//id="checkAll"
											label={v.id}
											val={v.id}
											// checked 
										/>
									</th>
									<td>{v.first_name}</td>
									<td>{v.last_name}</td>
									<td>{v.username}</td>
									<td>
										<BtnGroup size="sm">
											<Btn onClick={() => this.setEdit(true, i)} kind="info" className="i ion-ios-create scale12" tip="Edit" />
											<Btn onClick={() => this.onDelete(i)} kind="danger" className="i ion-md-close scale12" tip="Delete" />
										</BtnGroup>
									</td>
								</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				
        <Modal 
					backdrop="static" 
					keyboard={false} 
					show={modalEdit} 
					onHide={() => this.setEdit(false)}
				>
          <Modal.Header closeButton>
            <h1 className="h5 modal-title">Edit user</h1>
          </Modal.Header>
					
          <Modal.Body>
						{toEdit && 
							<form noValidate onSubmit={this.saveEdit}>
								{Object.keys(toEdit).map((v, i) => 
									v === 'id' ? 
									<input key={i} type="hidden" defaultValue={toEdit[v]} id={v} name={v} required />
									:
									<div key={i} className="form-group">
										<label className="text-capitalize" htmlFor={v}>{v.replace('_',' ')}</label>
										<input className="form-control" type="text" id={v} name={v} defaultValue={toEdit[v]} required={v !== 'last_name'} />
									</div>
								)}
								
								<Btn type="reset">Reset</Btn>{' '}
								<Btn kind="primary" type="submit">Save</Btn>
							</form>
						}
					</Modal.Body>
					
          <Modal.Footer>
            <Btn onClick={() => this.setEdit(false)}>Cancel</Btn>
          </Modal.Footer>
        </Modal>
			</Fragment>
		)
	}
}
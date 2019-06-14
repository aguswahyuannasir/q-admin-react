import React,{Component,Fragment} from 'react';
import Head from "../app-part/Head";
//import Card from 'react-bootstrap/Card';
//import AsideMain from '../app-part/AsideMain';
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';// Table, 
import BtnGroup from '../components/q-ui-react/BtnGroup';
import Btn from '../components/q-ui-react/Btn';
import Flex from '../components/q-ui-react/Flex';
import CheckBox from '../components/q-ui-react/CheckBox';

export default class ContactUs extends Component{
  constructor(props){
    super(props);
    this.state = {
      datas: [
				{id: 1, from: "Muhamad", title: "Husein", type: "Q-think"},
				{id: 2, from: "Angelina", title: "Jolie", type: "Jolie"},
				{id: 3, from: "Imogen", title: "Pots", type: "Imogen"}
			],
			
			tbodyWidth: []
    };
  }
	
	componentDidMount(){
		console.log('componentDidMount in ContactUs - src\\pages\\ContactUs');
		
		let td = this.table.firstElementChild.firstElementChild.children;
		let tdWidth = [];
		
		for(let i = 0; i < td.length; i++){
			//if(i === 4) tdWidth.push(td[i].offsetWidth - 1);//  - 3
			//if(i !== 0 && i !== 4) tdWidth.push(td[i].offsetWidth + 1); // else if(i !== 0) tdWidth.push(td[i].offsetWidth + 1);
			//else tdWidth.push(td[i].offsetWidth - 1);
			tdWidth.push(td[i].offsetWidth);
		}
		
		this.setState({tbodyWidth: tdWidth});
	}
	
	render(){
		const {datas, tbodyWidth} = this.state;
		const loopDatas = [...datas, ...datas, ...datas, ...datas, ...datas];
		
		return (
			<Fragment>
				<Head
					title="Contact us"
				/>
			
				<div className="p-3">
					<h6>Contact us - Total ({datas.length})</h6>
					
					<div className="table-responsive q-table" style={{height:'calc(100vh - 110px)'}}>
						<Flex dir="row" align="stretch" elClass="q-thead">
							<div style={{width: tbodyWidth[0]}}>
								<UncontrolledButtonDropdown inNavbar>
									<DropdownToggle size="sm" caret color="fff">No.</DropdownToggle>
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
							<div style={{width: tbodyWidth[1]}}>From</div>
							<div style={{width: tbodyWidth[2]}}>Title</div>
							<div style={{width: tbodyWidth[3]}}>Type</div>
							<div style={{width: tbodyWidth[4]}}>Action</div>
						</Flex>
					
						<table ref={c => {this.table = c}} className="table table-sm table-striped table-hover tb-contacts"
							//  table-bordered
						>
							
							<tbody>
								{loopDatas.map((v, i) => 
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
									<td>{v.from}</td>
									<td>{v.title}</td>
									<td>{v.type}</td>
									<td>
										<BtnGroup size="sm">
											<Btn kind="info" className="i ion-md-eye scale12" tip="Show Detail" />
											<Btn kind="danger" className="i ion-ios-trash scale12" tip="Delete" />
										</BtnGroup>
									</td>
								</tr>
								)}
							</tbody>
						</table>
					</div>
					
				</div>
			</Fragment>
		)
	}
}
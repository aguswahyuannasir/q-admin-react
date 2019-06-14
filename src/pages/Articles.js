import React,{Component,Fragment} from 'react';
import Head from "../app-part/Head";
//import Card from 'react-bootstrap/Card';
//import AsideMain from '../app-part/AsideMain';
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';// Table, 
import Flex from '../components/q-ui-react/Flex';
// import A from '../components/q-ui-react/A';
import BtnGroup from '../components/q-ui-react/BtnGroup';
import Btn from '../components/q-ui-react/Btn';
import CheckBox from '../components/q-ui-react/CheckBox';
import Qswal from '../components/q-ui-react/Qswal';

export default class Articles extends Component{
  constructor(props){
    super(props);
    this.state = {
      datas: [
				{id: 1, category: "Health", title: "Info kesehatan 1", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"},
				{id: 2, category: "Joke", title: "Lelucon Dummy title", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"},
				{id: 3, category: "Movie", title: "Film serem info", content: "Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
			],
			tbodyWidth: []
    };
  }
	
	componentDidMount(){
		console.log('componentDidMount in Articles - src\\pages\\Articles');
		
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

	confirmDelete(i, key){
		let getUser = this.state.datas[i];
		
		Qswal.fire({
			title: 'Are you sure?',
			text: `to delete - ${getUser[key]}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		})
		.then(res => {
			if(res.value){
				Qswal.fire(
					'Deleted!', '',
					'success'
				)
			}
		});
	}
	
	render(){
		const {datas, tbodyWidth} = this.state;
		//const loopDatas = [...datas, ...datas, ...datas, ...datas, ...datas];
		
		return (
			<Fragment>
				<Head
					title="Articles"
				/>
			
				<div className="pt-3 px-3">
					<Flex dir="row" justify="between" elClass="mb-2">
						<h6>Articles - Total ({datas.length})</h6>
{/* this.props.dispatch({type: "OPEN_BOX"}, e) <A dom="link" href="/input-data/articles-inputs" size="sm" btn="primary" aClass="i ion-md-add scale12">Add Article</A>*/}
<Btn onClick={() => this.props.dispatch({type: "OPEN_BOX"}, null, {title:'New Article'})} size="sm" kind="primary" className="i ion-md-create scale12">Add Article</Btn>
					</Flex>
					
					<div className="table-responsive q-table" style={{height:'calc(100vh - 105px)'}}>
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
							<div style={{width: tbodyWidth[1]}}>ID</div>
							<div style={{width: tbodyWidth[2]}}>Category</div>
							<div style={{width: tbodyWidth[3]}}>Title</div>
							<div style={{width: tbodyWidth[4]}}>Content</div>
							<div style={{width: tbodyWidth[5]}}>Action</div>
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
											label={i + 1}
											val={v.id}
											// checked 
										/>
									</th>
									<td>{v.id}</td>
									<td>{v.category}</td>
									<td>{v.title}</td>
									<td style={{width:500}}>{v.content}</td>
									<td>
										<BtnGroup size="sm">
											<Btn kind="info" className="i ion-md-eye scale12" tip="Show Detail" />
											<Btn onClick={() => this.confirmDelete(i, 'title')} kind="danger" className="i ion-md-close scale12" tip="Delete" />
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
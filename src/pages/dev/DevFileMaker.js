import React,{Component,Fragment} from 'react';
import {Route} from "react-router-dom";// Redirect
import {Row, Col} from "reactstrap";
import Head from "../../app-part/Head";
// import RouteSubRoutes from "../../components/route/RouteSubRoutes";
// import RouteRender from "../../components/route/RouteRender";
// import FileMaker from "../../components/file-maker/FileMaker";

import A from "../../components/q-ui-react/A";
import Form from "../../components/q-ui-react/Form";
import Btn from "../../components/q-ui-react/Btn";

import {Tab, Tabs, TabList, TabPanel} from '../../components/react-tabs';

// i ion-md-code, ion ion-md-document, ion ion-md-image, ion ion-ios-film | ion ion-ios-videocam | ion ion-md-videocam
function Maker({type, files}){
	return (
		<Row form>
			<Col md="3">
				<h6 className="i ion-md-document scale12"> {type} files: ({files.length})</h6>
				
				<div className="list-group list-group-flush small q-scroll">
					{files && files.length > 0 ? 
						files.map((v, i) => 
							<div key={i} className="list-group-item list-group-item-action">{v.src}</div>
						)
						:
						<div className="alert alert-danger">File is Empty</div>
					}
				</div>
			</Col>
			
			<Col md="9">
				<Form noValidate autoComplete="off">
					<Btn as="label" className="position-relative">
						File
						<input type="file" className="position-absolute" style={{top:0,right:0,bottom:0,left:0,width:'100%',opacity:0}} />
					</Btn>
					
					<textarea className="form-control" placeholder="Type here" />
					
					<Btn type="submit">Save</Btn>
				</Form>
				
				<hr/>
				
				<Tabs>
					<TabList>
						<Tab>Title 1</Tab>
						<Tab>Title 2</Tab>
					</TabList>

					<TabPanel>
						<h2>Any content 1</h2>
					</TabPanel>
					<TabPanel>
						<h2>Any content 2</h2>
					</TabPanel>
				</Tabs>
			</Col>
		</Row>
	);
}

export default class DevFileMaker extends Component{
	constructor(props){
		super(props);
		this.state = {
			urls: [
				{url:"/dev/file-maker/code", txt:"Code"},
				{url:"/dev/file-maker/document", txt:"Document"},
				{url:"/dev/file-maker/image", txt:"Image"},
				{url:"/dev/file-maker/video", txt:"Video"}
			],
			codeFiles: [
				{id: 1, src:"index.js",type:"text/javascript"},
				{id: 1, src:"style.css",type:"text/css"}
			],
			documentFiles: [
				{id: 1, src:"surat.docx",type:"application/msword"}
			],
			imageFiles: [],
			videoFiles: []
		};
	}
	
	componentDidMount(){
		console.log('componentDidMount in DevFileMaker - src\\pages\\dev\\DevFileMaker');
	}
	
	fileList = (type) => {
		const {codeFiles, documentFiles, imageFiles, videoFiles}  = this.state;
		
		switch(type){
			case 'Code':
				return codeFiles;
			case 'Document':
				return documentFiles;
			case 'Image':
				return imageFiles;
			case 'Video':
				return videoFiles;
			default: 
				return [];
				// break;
		}
	}
	
	render(){
		const {urls} = this.state;
		
		return (
			<Fragment>
				<Head
					title="FileMaker"
				/>
				
				<div className="p-3">
					<nav className="nav nav-pills">
						{urls.map((v, i) => <A key={i} dom href={v.url} aClass="nav-item nav-link mr-2">{v.txt}</A>)}
						
						<Btn as="div" outline kind="primary">File List</Btn>
					</nav>
					
					<div className="py-3">
						{urls.map((v, i) => 
							<Route 
								key={i} 
								path={v.url} 
								render={() => (
									<Maker type={v.txt} files={this.fileList(v.txt)} />
								)}
							/>
						)}
					</div>
				</div>
			</Fragment>
		)
	}
}

/*
						<RouteRender 
							path="/dev/file-maker/test" 
							comp={Test} 
						/>

<FileMaker 
					
				/>
*/
import React,{Component,Fragment} from 'react';
import Head from "../../app-part/Head";
// import FileMaker from "../../components/file-maker/FileMaker";

export default class DevVttMaker extends Component{
	
	
	componentDidMount(){
		console.log('componentDidMount in DevVttMaker - src\\pages\\dev\\DevVttMaker');
	}
	
	render(){
		// const {urls} = this.state;// , formEdit
		
		return (
			<Fragment>
				<Head
					title="DevVttMaker"
				/>
			
				DevVttMaker
			</Fragment>
		)
	}
}

/*
<FileMaker 
					
				/>
*/
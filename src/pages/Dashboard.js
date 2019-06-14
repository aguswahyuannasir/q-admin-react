import React,{Component,Fragment} from 'react';
import Head from "../app-part/Head";
//import Card from 'react-bootstrap/Card';
//import AsideMain from '../app-part/AsideMain';
import {Row, Col} from 'reactstrap';
import ImgHolder from '../components/q-ui-react/ImgHolder';

//import Portal from '../components/q-ui-react/box/Portal';

export default class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      datas: [
				{id: 1, title: "Dummy 1", text: "This is dummy 1", src: "image_1.jpg"},
				{id: 2, title: "Dummy 2", text: "This is dummy 2", src: "image_2.jpg"},
				{id: 3, title: "Dummy 3", text: "This is dummy 3", src: "image_3.jpg"},
				{id: 4, title: "Dummy 4", text: "This is dummy 4", src: "image_4.jpg"},
			]
    };
  }
	
	render(){
		const {datas} = this.state;
		
		return (
			<Fragment>
				<Head
					title="Dashboard"
				/>			
			
				<div className="p-3">
					<h6>Dashboard</h6>
					
					<Row form>
						{datas.map((v, i) => 
						<Col key={i} md="3">
							<div className="card shadow-sm">
								<div className="row no-gutters">
									<div className="col-md-5">
										<ImgHolder h="100%" textSize="fs1" label={v.title} text={v.src} />
									</div>
									<div className="col-md-7">
										<div className="card-body">
											<h1 className="h6 card-title">{v.text}</h1>
											<p className="card-text"><small className="text-muted">Last</small></p>
										</div>
									</div>
								</div>
							</div>
						</Col>
						)}
					</Row>
					
					{/*<Portal
						boxWidth={300} 
					/>*/}
				</div>
			</Fragment>
		)
	}
}
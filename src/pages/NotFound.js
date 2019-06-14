import React from "react";// ,{Fragment}
import Head from "../app-part/Head";// import {Helmet} from "react-helmet";
//import {Redirect} from "react-router-dom";
import Flex from '../components/q-ui-react/Flex';

export default function NotFound(){ // {location}
	//console.log(location);

  return (
		<Flex dir="column" justify="center"
			style={{height:'85vh'}}
			elClass="txt-c"
		>
			<Head
				title="Not Found 404"
			/>
			
			<h1 className="h3">Not Found</h1>
			<p><b className="fs2 text-danger">&#9888;</b> Sorry, this content isn't available</p>
			<div><a href="/" className="btn btn-primary fw600 i ion-md-arrow-back"> BACK</a></div>
		</Flex>
  );
}

/*
<Fragment>
	{location.pathname === "/sign-in" || location.pathname === "/sign-up" ?
		<Redirect
			//to={{
			//	pathname: "/",
			//	state: {from: location}
			//}}

			to="/"
		/>
		:
		<Flex dir="column" justify="center"
			style={{height:'85vh'}}
			//  elClass="min-vh-100"
		>
			<Helmet>
				<title>Not Found 404 - Programmeria</title>
			</Helmet>
			
			<h1 className="h3 hr-h">Not Found</h1>
			<p className="txt-c i q-alert"> Sorry, this content isn't available</p>
		</Flex>
	}
	</Fragment>
*/
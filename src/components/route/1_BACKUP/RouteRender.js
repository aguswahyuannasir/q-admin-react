import React from "react";// Fragment
import {Route} from "react-router-dom";// ,NavLink

export default function RouteRender({...rest}){ // comp: Component, | {component: Component, ...rest}
  return (
		<Route {...rest} />
  );
}

/*
		<Route 
			{...rest} 
			render={props => (
				<FadeIn>
					<Component {...props}/>
				</FadeIn>
			)}
		/>
*/
import React from "react";// Fragment
import {Route} from "react-router-dom";// ,NavLink

export default function RouteSubRoutes(route){
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting | {...route} = Q-CUSTOM / OPTION
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
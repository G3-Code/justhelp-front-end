import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("token")) {
          console.log(
            ":: PRIVATE ROUTE - TOKEN AVAILABLE ::" +
              localStorage.getItem("token")
          );
          return <Component {...props} />;
        } else {
          console.log(
            ":: PRIVATE ROUTE - TOKEN NOT AVAILABLE" +
              localStorage.getItem("token")
          );
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;

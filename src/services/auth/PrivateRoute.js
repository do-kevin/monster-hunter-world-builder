import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isAuthenticated() === true) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: props.location,
            },
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;

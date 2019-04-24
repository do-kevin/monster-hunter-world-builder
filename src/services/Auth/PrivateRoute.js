/* eslint-disable import/prefer-default-export */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
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

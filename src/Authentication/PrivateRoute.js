/* eslint-disable import/prefer-default-export */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (Auth.isAuthenticated() === true) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: "/auth",
            state: {
              from: props.location
            }
          }}
        />
      );
    }}
  />
);

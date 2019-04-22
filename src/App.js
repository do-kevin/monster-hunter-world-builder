/* eslint-disable react/prefer-stateless-function */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PrivateRoute } from "Services/Auth/PrivateRoute";
import { AuthProvider } from "Services/Auth/AuthContext";

// import Authentication from "Screens/Authentication";
// import Dashboard from "Screens/Dashboard";
// import ProfileCreation from "./Screens/ProfileCreation";
import {
  Dashboard, ProfileCreation, NotFound, Authentication,
} from "Screens";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "hsl(175, 100%, 20%)",
    },
    secondary: {
      main: "hsl(240, 100%, 76%)",
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <ToastContainer autoClose={1500} hideProgressBar />
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect from="/" to="/auth" />}
              />
              <Route
                path="/account_verification"
                component={props => (
                  <Redirect
                    to={{
                      pathname: "/auth/account_verification",
                      state: { credentials: props.location.search },
                    }}
                  />
                )}
              />
              <Route path="/auth/:auth_type?" component={Authentication} />
              <PrivateRoute path="/app" component={Dashboard} />
              <PrivateRoute path="/app/profile" component={ProfileCreation} />
              {/* <PrivateRoute
                exact
                path="/app/create_profile"
                component={ProfileCreation}
              />
              <PrivateRoute
                exact
                path="/app/create_profile"
                component={ProfileCreation}
              />
              <PrivateRoute exact path="/app/dashboard" component={Dashboard} /> */}
              {/* <Route
            path="/confirm-password/:initToken"
            component={ConfirmPassword}
            /> */}
              <Route component={NotFound} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </AuthProvider>
    );
  }
}

export default App;

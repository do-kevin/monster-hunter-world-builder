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

import { PrivateRoute } from "services/auth/PrivateRoute";
import { AuthProvider } from "services/auth/AuthContext";

import {
  Home, NotFound, Authentication,
} from "screens";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "hsl(247, 9%, 15%)",
    },
    secondary: {
      main: "hsl(16, 100%, 60%)",
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
              <PrivateRoute path="/app" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </AuthProvider>
    );
  }
}

export default App;

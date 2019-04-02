import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "Screens/Login";
import NotFound from "Screens/NotFound";
import VerificationScreen from "Screens/VerificationScreen";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF5A5F"
    },
    secondary: {
      main: "#00A699"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/account_verification"
              component={VerificationScreen}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

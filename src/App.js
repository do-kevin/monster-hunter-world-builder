import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "Screens/Login";
import NotFound from "Screens/NotFound";
import Verification from "Screens/Verification";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "hsl(175, 100%, 20%)"
    },
    secondary: {
      main: "hsl(240, 100%, 76%)"
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
              component={Verification}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

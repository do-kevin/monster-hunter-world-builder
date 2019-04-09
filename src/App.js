/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginRegistration from 'Screens/LoginRegistration';
import { AuthProvider } from 'components/AuthContext';
import NotFound from 'Screens/NotFound';
import Verification from 'Screens/Verification';
import ConfirmPassword from 'Screens/ConfirmPassword';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: 'hsl(175, 100%, 20%)',
    },
    secondary: {
      main: 'hsl(240, 100%, 76%)',
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/" component={LoginRegistration} />
              <Route
                exact
                path="/account_verification"
                component={Verification}
              />
              <Route path="/confirm-password/:initToken" component={ConfirmPassword} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </AuthProvider>
    );
  }
}

export default App;

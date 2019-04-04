import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginRegistration from 'Screens/LoginRegistration';
import NotFound from 'Screens/NotFound';
import Verification from 'Screens/Verification';
import CreateAccount from 'Screens/CreateAccount';

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

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginRegistration} />
          <Route
            exact
            path="/account_verification"
            component={Verification}
          />
          <Route path="/create-account/:profileId/:profileToken" component={CreateAccount} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;

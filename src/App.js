/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { PrivateRoute } from 'Authentication/PrivateRoute';
import { AuthProvider } from 'Authentication/AuthContext';

import DynamicImport from 'components/DynamicImport';
import Loading from 'components/Loading';

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

const LoginRegistration = props => (
  <DynamicImport load={() => import('Screens/LoginRegistration')}>
    {
      Component => (Component === null
        ? (
          <Loading />
        )
        : <Component {...props} />)
    }
  </DynamicImport>
);

const Verification = props => (
  <DynamicImport load={() => import('Screens/Verification')}>
    {
      Component => (Component === null
        ? (
          <Loading />
        )
        : <Component {...props} />)
    }
  </DynamicImport>
);

const ConfirmPassword = props => (
  <DynamicImport load={() => import('Screens/ConfirmPassword')}>
    {
      Component => (Component === null
        ? (
          <Loading />
        )
        : <Component {...props} />)
    }
  </DynamicImport>
);

const ProfileCreation = props => (
  <DynamicImport load={() => import('Screens/ProfileCreation')}>
    {
      Component => (Component === null
        ? (
          <Loading />
        )
        : <Component {...props} />)
    }
  </DynamicImport>
);

const Dashboard = props => (
  <DynamicImport load={() => import('Screens/Dashboard')}>
    {
      Component => (Component === null
        ? (
          <Loading />
        )
        : <Component {...props} />)
    }
  </DynamicImport>
);

const NotFound = props => (
  <DynamicImport load={() => import('Screens/NotFound')}>
    {
      Component => (Component === null
        ? (
          <Loading />
        )
        : <Component {...props} />)
    }
  </DynamicImport>
);

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
              <PrivateRoute
                exact
                path="/create_profile"
                component={ProfileCreation}
              />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
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

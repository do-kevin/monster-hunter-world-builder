import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LandingPage from './Misc/LandingPage';
import NotFound from './Misc/NotFound';
import VerificationScreen from './LoginSignup/VerificationScreen';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/account_verification' component={VerificationScreen}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

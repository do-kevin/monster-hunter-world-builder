/* eslint-disable react/button-has-type */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import LoginForm from 'Screens/LoginForm';
import RegisterForm from 'Screens/RegisterForm';

class LoginRegistration extends Component {
  state = {
    showLogin: false,
  }

  render() {
    const { showLogin } = this.state;

    return (
      <div>
        {
          showLogin
            ? <LoginForm changeForm={() => this.setState({ showLogin: !showLogin })} />
            : <RegisterForm changeForm={() => this.setState({ showLogin: !showLogin })} />
        }
      </div>
    );
  }
}

export default LoginRegistration;

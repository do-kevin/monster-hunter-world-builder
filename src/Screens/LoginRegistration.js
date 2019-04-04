/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import LoginForm from 'Screens/LoginForm';
import RegisterForm from 'Screens/RegisterForm';
import PasswordReset from './PasswordReset';

class LoginRegistration extends Component {
  state = {
    showLogin: true,
    showResetPassword: false,
  }

  render() {
    const { showLogin, showResetPassword } = this.state;
    let renderForm;

    if (showLogin === true && showResetPassword === false) {
      renderForm = (
        <LoginForm
          changeForm={() => this.setState({ showLogin: !showLogin, showResetPassword: false })}
          changeToReset={() => this.setState({ showResetPassword: true })}
        />
      );
    }

    if (showLogin === false && showResetPassword === false) {
      renderForm = (
        <RegisterForm
          changeForm={() => this.setState({
            showLogin: !showLogin,
            showResetPassword: false,
          })}
        />
      );
    }

    if (showLogin === false && showResetPassword === true) {
      renderForm = (
        <PasswordReset
          changeForm={() => this.setState({
            showLogin: true,
            showResetPassword: false,
          })}
        />
      );
    }

    if (showLogin === true && showResetPassword === true) {
      renderForm = (
        <PasswordReset
          changeForm={() => this.setState({
            showLogin: true,
            showResetPassword: false,
          })}
        />
      );
    }


    return (
      <div>
        {renderForm}
      </div>
    );
  }
}

export default LoginRegistration;

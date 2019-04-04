import React, { Component } from 'react';
import {
  withStyles, Grid, Button,
} from '@material-ui/core';
import CenterPaper from 'components/layout/CenterPaper';
import { userLogin, registerEmail, resetPassword } from 'Services/RegistrationAPI';
import InputForms from 'components/forms/InputForms';

const styles = () => ({
  CustomBtn: {
    fontWeight: '600',
    width: '250px',
  },
  CustomTxtBtn: {
    padding: '0 2px',
    textTransform: 'none',
    margin: '5px auto',
    fontWeight: '600',
    color: 'hsl(0, 0%, 0%)',
  },
});

class LoginRegistration extends Component {
  state = {
    showLogin: true,
    showReset: false,
    showRegistration: false,
    signUpResult: '',
    resetResult: '',
  }

  toggleForm = (formType = '') => {
    const defaultObj = { showLogin: false, showReset: false, showRegistration: false };
    const overwriteToObj = { [formType]: true };

    const mergedObj = Object.assign(defaultObj, overwriteToObj);
    this.setState(mergedObj);
  }

  render() {
    const {
      showLogin, showReset, showRegistration, signUpResult, resetResult,
    } = this.state;
    const { classes } = this.props; // eslint-disable-line react/prop-types
    const { CustomTxtBtn, CustomBtn } = classes;
    let renderForm;

    if (showLogin) {
      renderForm = (
        <InputForms
          header="Sign in"
          initialValues={{ email: '', password: '' }}
          onSubmit={values => userLogin(values.email, values.password)}
          CustomBtnCn={CustomBtn}
          submitBtnLabel="Login"
          textFieldType="email"
          passwordField
        >
          <Grid item>
            <Button
              className={CustomTxtBtn}
              type="button"
              variant="text"
              onClick={() => {
                this.toggleForm('showRegistration');
              }}
            >
                  Don&apos;t have an account? Sign up
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={CustomTxtBtn}
              style={{ margin: '0 auto' }}
              type="button"
              variant="text"
              onClick={() => {
                this.toggleForm('showReset');
              }}
            >
                  Reset password
            </Button>
          </Grid>
        </InputForms>
      );
    } else if (showRegistration) {
      renderForm = (
        <InputForms
          header="Sign up"
          resultText={
            <h3 style={{ color: 'hsl(175, 100%, 25%)' }}>{signUpResult ? `${signUpResult} account. Please check inbox.` : null}</h3>
          }
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            const response = await registerEmail(values.email);
            this.setState({ signUpResult: response.statusText });
          }}
          CustomBtnCn={CustomBtn}
          submitBtnLabel="Register Email"
          textFieldType="email"
        >
          <Grid item>
            <Button
              className={CustomTxtBtn}
              type="button"
              variant="text"
              onClick={() => {
                this.toggleForm('showLogin');
              }}
            >
                Already have an account? Sign in
            </Button>
          </Grid>
        </InputForms>
      );
    } else if (showReset) {
      renderForm = (
        <InputForms
          resultText={
            <h3 style={{ color: 'hsl(175, 100%, 25%)' }}>{resetResult}</h3>
          }
          header="Reset password"
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            const response = await resetPassword(values.email);
            this.setState({ resetResult: response.data.message });
          }}
          CustomBtnCn={CustomBtn}
          submitBtnLabel="Confirm email"
          textFieldType="email"
        >
          <Grid item>
            <Button
              className={CustomTxtBtn}
              type="button"
              variant="text"
              onClick={() => {
                this.toggleForm('showLogin');
              }}
            >
              Already have an account? Sign in
            </Button>
          </Grid>
        </InputForms>
      );
    }

    return (
      <CenterPaper>
        {renderForm}
      </CenterPaper>
    );
  }
}

export default withStyles(styles)(LoginRegistration);

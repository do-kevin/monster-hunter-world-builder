import React, { Component } from 'react';
import {
  withStyles, Grid, Button, Snackbar, SnackbarContent,
} from '@material-ui/core';

import { AuthContext } from 'Authentication/AuthContext';
import api from 'Services/Api';
import auth from 'Authentication/auth';

import CenterPaper from 'components/layout/CenterPaper';
import { userLogin, registerEmail, resetPassword } from 'Services/RegistrationAPI';
import SmartFormik from 'components/forms/SmartFormik';

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
  danger: {
    backgroundColor: 'hsl(355, 70%, 46%)',
  },
});

class LoginRegistration extends Component {
  static contextType = AuthContext;

  state = {
    showLogin: true,
    showReset: false,
    showRegistration: false,
    signUpResult: '',
    resetResult: '',
    error: '',
  }

  async componentDidMount() {
    await api.defaultInstance();
  }

  toggleForm = (formType = '') => {
    const defaultObj = { showLogin: false, showReset: false, showRegistration: false };
    const overwriteToObj = { [formType]: true };

    const mergedObj = Object.assign(defaultObj, overwriteToObj);
    this.setState(mergedObj);
  }

  render() {
    const {
      showLogin, showReset, showRegistration, signUpResult, resetResult, error,
    } = this.state;
    const { classes, history } = this.props;
    const { CustomTxtBtn, CustomBtn } = classes;
    const {
      setProfileToken, setUserId,
    } = this.context;

    let renderForm;

    if (showLogin) {
      renderForm = (
        <SmartFormik
          header="Sign in"
          initialValues={{ email: '', password: '' }}
          onSubmit={
            async (values) => {
              const response = await userLogin(values.email, values.password);
              console.log(response);

              if (response.status === 200) {
                setProfileToken(response.data.token);
                setUserId(response.data.user_id);
                this.setState({ error: null });
                auth.login(() => { // api.login() not working
                  history.push('/create_profile');
                });
              } else {
                this.setState({ error: response });
              }
            }
          }
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
        </SmartFormik>
      );
    } else if (showRegistration) {
      renderForm = (
        <SmartFormik
          header="Sign up"
          resultText={
            <h3 style={{ color: 'hsl(175, 100%, 25%)' }}>{signUpResult ? `${signUpResult} account. Please check inbox.` : null}</h3>
          }
          initialValues={{ email: '' }}
          disableSubmitBtn="true"
          onSubmit={async (values) => {
            const response = await registerEmail(values.email);
            console.log(response);
            if (response.status === 201) {
              this.setState({ signUpResult: response.statusText });
            } else {
              this.setState({ error: response });
            }
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
        </SmartFormik>
      );
    } else if (showReset) {
      renderForm = (
        <SmartFormik
          resultText={
            <h3 style={{ color: 'hsl(175, 100%, 25%)' }}>{resetResult}</h3>
          }
          header="Reset password"
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            const response = await resetPassword(values.email);
            if (response !== 'This account does not exist.') {
              this.setState({ resetResult: response.data.message, error: null });
            } else {
              this.setState({ error: response });
            }
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
        </SmartFormik>
      );
    }

    return (
      <CenterPaper>
        {renderForm}
        {
          error
            ? (
              <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
              >
                <SnackbarContent
                  className={classes.danger}
                  message={<span id="message-id">{error}</span>}
                />
              </Snackbar>
            )
            : null
        }
      </CenterPaper>
    );
  }
}

export default withStyles(styles)(LoginRegistration);

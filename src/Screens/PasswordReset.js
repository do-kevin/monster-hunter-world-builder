/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper } from '@material-ui/core';
import { Formik } from 'formik';

import { resetPassword } from 'Services/RegistrationAPI';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing.unit * 7,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  CustomBtn: {
    fontWeight: '600',
    width: '225px',
  },
});

class PasswordReset extends Component {
  static propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    changeForm: PropTypes.func.isRequired,
  };

  state = {
    confirmResetMsg: '',
  }

  render() {
    const { classes, changeForm } = this.props;
    const { confirmResetMsg } = this.state;

    return (
      <Grid
        container
        spacing={24}
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.root}
      >
        <Grid item>
          <Paper className={classes.paper}>
            <h1>Reset Password</h1>
            <Formik
              initialValues={{ email: '' }}
              onSubmit={async (values) => {
                const response = await resetPassword(values.email);
                this.setState({
                  confirmResetMsg: response.data.message,
                });
              }}
              validate={({ email }) => {
                const errors = {};
                if (!email) {
                  errors.email = (
                    <span className="formikChild__form__errorMessage">
                      required
                    </span>
                  );
                }
                return errors;
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                isSubmitting,
                errors,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div style={{ textAlign: 'left' }}>
                    <label htmlFor="email">
                      Email
                      {' '}
                      {errors.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={values.email}
                      className="formikChild__form__input"
                    />
                  </div>
                  {
                    !confirmResetMsg
                      ? (
                        <Grid item>
                          <Button
                            className={classNames(classes.CustomBtn)}
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                          >
                          Confirm Email
                          </Button>
                        </Grid>
                      )
                      : <h3 style={{ color: 'hsl(134, 61%, 40%)', margin: '0 auto' }}>{confirmResetMsg}</h3>
                  }
                  <Grid item>
                    <button
                      className="formikChild__form__switch-btn"
                      onClick={changeForm}
                      type="button"
                    >
                      Return to login
                    </button>
                  </Grid>
                </form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PasswordReset);

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { Formik } from 'formik';

import { userLogin } from 'Services/RegistrationAPI';

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
    width: '220px',
  },
});

class LoginForm extends Component {
  static propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    changeForm: PropTypes.func.isRequired,
  };

  render() {
    const { classes, changeForm } = this.props;
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
            <h1>Sign In</h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={values => userLogin(values.email, values.password)}
              validate={({ email, password }) => {
                const errors = {};
                if (!email) {
                  errors.email = (
                    <span className="formikChild__form__errorMessage">
                      required
                    </span>
                  );
                } else if (!password) {
                  errors.password = (
                    <span className="formikChild__form__errorMessage">
                      required
                    </span>
                  );
                }
                return errors;
              }}
              render={({
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
                  <div style={{ textAlign: 'left' }}>
                    <label htmlFor="password">
                      Password
                      {' '}
                      {errors.password}
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={values.password}
                      className="formikChild__form__input"
                    />
                  </div>
                  <Grid item>
                    <Button
                      className={classNames(classes.CustomBtn)}
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      variant="contained"
                    >
                      LOGIN
                    </Button>
                    <Grid item>
                      <button
                        className="formikChild__form__switch-btn"
                        onClick={changeForm}
                        type="button"
                      >
                        Don&apos;t have an account? Sign up
                      </button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginForm);

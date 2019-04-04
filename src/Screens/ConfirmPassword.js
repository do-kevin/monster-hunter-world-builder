/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { Formik } from 'formik';

import { setPassword } from 'Services/RegistrationAPI';

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

class ConfirmPassword extends Component {
  static propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes, match } = this.props;
    const { params } = match;
    const { profileId, profileToken } = params;

    console.log({ profileId, profileToken });

    // const validationSchema = Yup.object().shape({
    //   password: Yup
    //     .string()
    //     .required()
    //     .min(8, 'Passeword is too short.'),
    // });

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
            <Formik
              initialValues={{
                password: '',
              }}
              onSubmit={values => setPassword(profileId, profileToken, values.password)}
              validate={({ password }) => {
                const errors = {};
                if (!password) {
                  errors.password = (
                    <span className="formikChild__form__errorMessage">
                      required
                    </span>
                  );
                } else if (!(new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).test(password)) {
                  errors.password = (
                    <span className="formikChild__form__errorMessage2">
                      <ul>
                        <li>At least 1 alphabetical character.</li>
                        <li>At least 1 special character.</li>
                        <li>At least 1 numeric character.</li>
                        <li>At least 8 characters long.</li>
                      </ul>
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
                      SET PASSWORD
                    </Button>
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

export default withStyles(styles)(ConfirmPassword);

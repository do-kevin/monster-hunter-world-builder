import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Button, TextField,
} from '@material-ui/core';
import { Formik } from 'formik';

import { setPassword } from 'Services/RegistrationAPI';
import CenterPaper from 'components/layout/CenterPaper';

const styles = () => ({
  CustomBtn: {
    fontWeight: '600',
    width: '220px',
  },
});

class ConfirmPassword extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      CustomBtn: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    confirmSetPassword: '',
  }

  render() {
    const { classes, match } = this.props; // eslint-disable-line react/prop-types
    const { params } = match;
    const { profileId, profileToken } = params;
    const { confirmSetPassword } = this.state;

    return (
      <CenterPaper>
        <Formik
          initialValues={{
            password: '',
          }}
          onSubmit={async (values) => {
            const response = await setPassword(profileId, profileToken, values.password);
            this.setState({
              confirmSetPassword: response.message,
            });
          }}
          validate={({ password }) => {
            const errors = {};
            if (!password) {
              errors.password = true;
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
              <h1>Create password</h1>
              <TextField
                id="password"
                label="Password"
                className={classes.textField}
                style={{ width: '100%' }}
                type="password"
                name="password"
                autoComplete="password"
                onChange={handleChange}
                value={values.password}
                margin="normal"
                variant="outlined"
                error={errors.password}
              />
              <Grid item>
                {
                !confirmSetPassword
                  ? (
                    <Button
                      className={classes.CustomBtn}
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      variant="contained"
                    >
                    SET PASSWORD
                    </Button>
                  )
                  : <h3 style={{ color: 'hsl(134, 61%, 40%)', margin: '0 auto' }}>{confirmSetPassword}</h3>
              }
              </Grid>
            </form>
          )}
        />
      </CenterPaper>
    );
  }
}

export default withStyles(styles)(ConfirmPassword);

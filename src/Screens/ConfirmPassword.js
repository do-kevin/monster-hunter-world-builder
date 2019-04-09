import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { AuthConsumer } from 'components/AuthContext';
import {
  Grid, Button, TextField,
} from '@material-ui/core';
import { Formik } from 'formik';

import { Link } from 'react-router-dom';
import { setPassword } from 'Services/RegistrationAPI';
import CenterPaper from 'components/layout/CenterPaper';

const styles = () => ({
  CustomBtn: {
    fontWeight: '600',
    width: '220px',
  },
  CustomTxtBtn: {
    padding: '0 2px',
    textTransform: 'none',
    margin: '5px auto',
    fontWeight: '600',
    color: 'hsl(0, 0%, 0%)',
  },
});

class ConfirmPassword extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      CustomBtn: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    setPasswordReq: '',
  }

  render() {
    const { classes } = this.props; // eslint-disable-line react/prop-types
    const { setPasswordReq } = this.state;

    return (
      <CenterPaper>
        <AuthConsumer>
          {value => (
            <Formik
              initialValues={{
                password: '',
              }}
              onSubmit={async (values) => {
                const { userId, profileId } = value;
                const response = await setPassword(userId, profileId, values.password);
                this.setState({
                  setPasswordReq: response.message,
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
                  !setPasswordReq
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
                    : (
                      <div>
                        <h3 style={{
                          color: setPasswordReq !== 'Request failed with status code 404'
                            ? 'hsl(134, 61%, 40%)'
                            : 'hsl(355, 70%, 46%)',
                          margin: '0 auto',
                        }}
                        >
                          {setPasswordReq}

                        </h3>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                          <Button
                            className={classes.CustomTxtBtn}
                            type="button"
                            variant="text"
                          >
                            Go back to home page
                          </Button>
                        </Link>
                      </div>
                    )
                }
                  </Grid>
                </form>
              )}
            />
          )
          }
        </AuthConsumer>
      </CenterPaper>
    );
  }
}

export default withStyles(styles)(ConfirmPassword);

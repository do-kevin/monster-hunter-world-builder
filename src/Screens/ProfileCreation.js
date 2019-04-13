/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  TextField, withStyles, Button, Grid,
} from '@material-ui/core';
import { Formik } from 'formik';

import { createProfile, getProfile } from 'Services/RegistrationAPI';
import { AuthContext } from 'Authentication/AuthContext';
import auth from 'Authentication/auth';

import CenterPaper from 'components/layout/CenterPaper';

const styles = () => ({});

class ProfileCreation extends Component {
  static contextType = AuthContext;

  async componentDidMount() {
    const { userId, profileToken } = this.context;
    const { history } = this.props;

    const response = await getProfile(userId, profileToken);

    if (response.status === 200) {
      history.push('/dashboard');
    }
  }

  render() {
    const { userId, profileToken } = this.context;
    const { history, classes } = this.props;
    return (
      <div>
        <button
          onClick={() => {
            auth.logout(() => {
              history.push('/');
            });
            auth.isAuthenticated();
          }}
          type="button"
        >
        Log out
        </button>
        <hr />
        <CenterPaper>
          <Formik
            initialValues={{
              fname: '', lname: '', birthdate: '', phonenum: '',
            }}
            onSubmit={
              (values) => {
                const {
                  fname, lname, birthdate, phonenum,
                } = values;

                createProfile(userId, profileToken, fname, lname, birthdate, phonenum);
              }
            }
          >
            {({
              values,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  id="fname"
                  label="First name"
                  className={classes.TextField}
                  style={{ width: '100%' }}
                  type="text"
                  name="fname"
                  autoComplete="fname"
                  onChange={handleChange}
                  value={values.fname}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="lname"
                  label="Last name"
                  className={classes.TextField}
                  style={{ width: '100%' }}
                  type="text"
                  name="lname"
                  autoComplete="lname"
                  onChange={handleChange}
                  value={values.lname}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="birthdate"
                  label="Birthday"
                  className={classes.TextField}
                  style={{ width: '100%' }}
                  type="date"
                  name="birthdate"
                  autoComplete="birthdate"
                  onChange={handleChange}
                  value={values.birthdate}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="phonenum"
                  label="Phone number"
                  className={classes.TextField}
                  style={{ width: '100%' }}
                  type="text"
                  name="phonenum"
                  autoComplete="phonenum"
                  onChange={handleChange}
                  value={values.phonenum}
                  margin="normal"
                  variant="outlined"
                />
                <Grid item>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </CenterPaper>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileCreation);

import React, { Component } from "react";
import classNames from 'classnames';

import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, Paper } from "@material-ui/core";
import { Formik } from "formik";

import { registerEmail } from "Services/RegistrationAPI";

const styles = theme => ({
  root: {
    height: "100vh"
  },
  paper: {
    padding: theme.spacing.unit * 7,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  CustomBtn: {
    fontWeight: "600"
  }
});

class Login extends Component {
  render() {
    const { classes } = this.props;
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
            <h1>Sign Up</h1>
            <Formik
              initialValues={{ email: ""}}
              onSubmit={values => registerEmail(values.email)}
              validate={({ email }) => {
                let errors = {};
                if (!email) {
                  errors.email = (
                    <span className="loginContainer__form__errorMessage">
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
                errors
              }) => (
                <form onSubmit={handleSubmit}>
                  <div style={{ textAlign: "left" }}>
                    <label htmlFor="email">Email {errors.email}</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      className="loginContainer__form__input"
                    />
                  </div>
                  <Button
                    className={classNames(classes.CustomBtn)}
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                  >
                    Register Email
                  </Button>
                </form>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);

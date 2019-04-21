/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Grid, Button, TextField, withStyles } from "@material-ui/core";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import { userLogin } from "services/Auth/RegistrationApi";
import { withRouter } from "react-router-dom";

const styles = () => ({
  submitButton: {
    fontWeight: "600",
    width: "250px"
  }
});

function Signin(props) {
  const { classes } = props;

  const handleLogin = async (email, password) => {
    const { history } = props;
    await userLogin(email, password);
    history.push("/app");
  };

  return (
    <div>
      <h1>Sign in</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={values => handleLogin(values.email, values.password)}
        render={({ values, handleSubmit, handleChange, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label={"Email"}
              className={classes.TextField}
              style={{ width: "100%" }}
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              className={classes.TextField}
              style={{ width: "100%" }}
              type="password"
              name="password"
              autoComplete="password"
              value={values.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <Grid item>
              <Button
                className={classes.submitButton}
                color="primary"
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <p>
                Don't have an account? <Link to="/auth/signup"> Sign Up</Link>
              </p>
            </Grid>
            <Grid item>
              <p>
                Forgot your password?
                <Link to="/auth/reset_password"> Reset Password</Link>
              </p>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}

export default withRouter(withStyles(styles)(Signin));

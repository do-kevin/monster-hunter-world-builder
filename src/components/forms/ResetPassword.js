/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Grid, Button, TextField, withStyles } from "@material-ui/core";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import { resetPassword } from "services/Auth/RegistrationApi";

const styles = () => ({
  submitButton: {
    fontWeight: "600",
    width: "250px"
  }
});

function ResetPassword(props) {
  const { classes } = props;
  return (
    <div>
      <h1>Reset password</h1>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={values => resetPassword(values.email)}
        render={({ values, handleSubmit, handleChange }) => (
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
            <Grid item>
              <Button
                className={classes.submitButton}
                color="primary"
                type="submit"
                variant="contained"
              >
                Reset My Password
              </Button>
            </Grid>
            <Grid item>
              <p>
                Don't have an account? <Link to="/auth"> Sign in</Link>
              </p>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}

export default withStyles(styles)(ResetPassword);

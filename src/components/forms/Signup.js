import React, { useState } from "react";
import {
  Grid, Button, TextField, withStyles,
} from "@material-ui/core";
import { Formik } from "formik";
import { Link, withRouter } from "react-router-dom";

import { registerEmail } from "services/auth/RegistrationApi";

const styles = () => ({
  submitButton: {
    fontWeight: "600",
    width: "250px",
    color: "white",
  },
});

function Signup(props) {
  const { classes } = props;
  const [signedUp, setSignedUp] = useState(false);

  const register = async (email) => {
    const response = await registerEmail(email);
    if (response) {
      setSignedUp(true);
    }
  };

  return signedUp ? (
    <p>Please click confirmation link in your email.</p>
  ) : (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={values => register(values.email)}
        render={({
          values, handleSubmit, handleChange,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              className={classes.textField}
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
                color="secondary"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Grid>
            <Grid item>
              <p>
                Already have an account?
                {" "}
                <Link to="/auth">Sign in</Link>
              </p>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}

export default withRouter(withStyles(styles)(Signup));

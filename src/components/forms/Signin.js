import React from "react";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Grid, Button, TextField, withStyles,
} from "@material-ui/core";
import { Formik } from "formik";

import { userLogin } from "services/auth/RegistrationApi";
import { setTokenUserId } from "redux/state/profile/Actions";

const styles = () => ({
  submitButton: {
    fontWeight: "600",
    width: "250px",
    color: "white",
  },
});

function Signin(props) {
  const { classes } = props;

  const handleLogin = async (email, password) => {
    const { history, tokenUserIdOnLogin } = props;
    const response = await userLogin(email, password);
    const { token, user_id } = response;
    tokenUserIdOnLogin(token, user_id);
    history.push("/app");
  };

  return (
    <div>
      <h1>Sign in</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={values => handleLogin(values.email, values.password)}
        render={({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
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
                color="secondary"
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <p>
                Don&#39;t have an account?
                {" "}
                <Link to="/auth/signup">Sign Up</Link>
              </p>
            </Grid>
            <Grid item>
              <p>
                Forgot your password?
                {" "}
                <Link to="/auth/reset_password">Reset Password</Link>
              </p>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}

const componentWithStyles = withRouter(withStyles(styles)(Signin));

function mapDispatchToProps(dispatch) {
  return {
    tokenUserIdOnLogin: bindActionCreators(setTokenUserId, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(componentWithStyles);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Grid, Button, TextField, withStyles,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";

import { dark0 } from "Colors";
import { setPassword, verifyEmail } from "services/auth/RegistrationApi";

const styles = () => ({
  CustomBtn: {
    fontWeight: "600",
    width: "220px",
    color: "white",
  },
  CustomTxtBtn: {
    padding: "0 2px",
    textTransform: "none",
    margin: "5px auto",
    fontWeight: "600",
    color: dark0,
  },
});

const pwdValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Your password must be at least eight characters long.")
    .matches(
      new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
      ),
      "Your password must contain an uppercase, lowercase, numeric, and a special character.",
    ),
});

class Verification extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      CustomBtn: PropTypes.string.isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    const { user_id, token } = this.props;
    await verifyEmail(user_id, token);
  }

  handleSetPassword = async (password) => {
    const { user_id, history } = this.props;
    await setPassword(user_id, password);
    history.push("/auth");
  };

  render() {
    const { classes } = this.props;
    return (
      <Formik
        initialValues={{
          password: "",
        }}
        onSubmit={values => this.handleSetPassword(values.password)}
        validationSchema={pwdValidationSchema}
        render={({
          values,
          handleSubmit,
          handleChange,
          isSubmitting,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <h1>Create password</h1>
            {errors.password}
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              style={{ width: "100%" }}
              type="password"
              name="password"
              autoComplete="password"
              onChange={handleChange}
              value={values.password}
              margin="normal"
              variant="outlined"
            />
            <Grid item>
              <Button
                className={classes.CustomBtn}
                color="secondary"
                type="submit"
                disabled={isSubmitting}
                variant="contained"
              >
                Set Password
              </Button>
            </Grid>
          </form>
        )}
      />
    );
  }
}

export default withRouter(withStyles(styles)(Verification));

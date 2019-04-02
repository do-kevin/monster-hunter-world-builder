import React, { Component } from "react";
import { registerEmail } from "Services/RegistrationAPI";
import { Formik } from "formik";

// Layout Components
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    height: "100vh"
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: "center",
    color: theme.palette.text.secondary
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
              initialValues={{ email: "", firstName: "", lastName: "" }}
              onSubmit={values => registerEmail(values.email)}
              validate={({ firstName, lastName, email }) => {
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
                    <label>Email {errors.email}</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      className="loginContainer__form__input"
                    />
                  </div>
                  <Button
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

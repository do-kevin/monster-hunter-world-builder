import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  TextField, withStyles, Button, Grid,
} from "@material-ui/core";
import { Formik } from "formik";

import { createNewProfile } from "store/ducks/Profile";
import CenterPaper from "components/layout/CenterPaper";

const styles = () => ({});

function ProfileCreationForm(props) {
  const {
    classes, profile, history, createNewProfile,
  } = props;
  const userId = profile.user;

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ width: "110vw" }}
    >
      <CenterPaper>
        <Formik
          initialValues={{
            fname: "",
            lname: "",
            birthdate: "",
            phonenum: "",
          }}
          onSubmit={async (values) => {
            const {
              fname, lname, birthdate, phonenum,
            } = values;

            const result = await createNewProfile(userId, fname, lname, birthdate, phonenum);
            if (result === true) {
              history.push("/app/dashboard");
            }
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h2>Create your profile</h2>
              <TextField
                id="fname"
                label="First name"
                className={classes.textField}
                style={{ width: "100%" }}
                type="text"
                name="fname"
                autoComplete="fname"
                onChange={handleChange}
                value={values.fname}
                margin="normal"
              />
              <TextField
                id="lname"
                label="Last name"
                className={classes.textField}
                style={{ width: "100%" }}
                type="text"
                name="lname"
                autoComplete="lname"
                onChange={handleChange}
                value={values.lname}
                margin="normal"
              />
              <TextField
                id="birthdate"
                label="Birthday"
                className={classes.textField}
                style={{ width: "100%" }}
                type="date"
                name="birthdate"
                autoComplete="birthdate"
                onChange={handleChange}
                value={values.birthdate}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                id="phonenum"
                label="Phone number"
                className={classes.textField}
                style={{ width: "100%" }}
                type="text"
                name="phonenum"
                autoComplete="phonenum"
                onChange={handleChange}
                value={values.phonenum}
                margin="normal"
              />
              <Grid item>
                <Button
                  color="secondary"
                  style={{ color: "white" }}
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
    </Grid>
  );
}

const componentWithStyles = withStyles(styles)(ProfileCreationForm);

const mapStateToProps = state => ({ profile: state.profile });

const mapDispatchToProps = dispatch => ({
  createNewProfile: bindActionCreators(createNewProfile, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);

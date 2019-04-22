/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  TextField, withStyles, Button, Grid,
} from "@material-ui/core";
import { Formik } from "formik";

import { updateProfile, grabId } from "Redux/state/profile/actions";
import { createProfile } from "Services/Auth/RegistrationApi";
import CenterPaper from "components/layout/CenterPaper";

const styles = () => ({});

class ProfileCreation extends Component {
  render() {
    const {
      classes, reduxState, initCreation, changePage, setId,
    } = this.props;
    const userId = reduxState.profile.user;

    return (
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

            await initCreation(userId, fname, lname, birthdate, phonenum);
            const response = await createProfile(userId, fname, lname, birthdate, phonenum);
            if (response) {
              await setId(response.id);
              changePage();
            }
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h2>Create your profile</h2>
              <TextField
                id="fname"
                label="First name"
                className={classes.TextField}
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
                className={classes.TextField}
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
                className={classes.TextField}
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
                className={classes.TextField}
                style={{ width: "100%" }}
                type="text"
                name="phonenum"
                autoComplete="phonenum"
                onChange={handleChange}
                value={values.phonenum}
                margin="normal"
              />
              <Grid item>
                <Button color="primary" type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </CenterPaper>
    );
  }
}

const componentWithStyles = withStyles(styles)(ProfileCreation);

function mapStateToProps(state) {
  return {
    reduxState: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initCreation: bindActionCreators(updateProfile, dispatch),
    setId: bindActionCreators(grabId, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);

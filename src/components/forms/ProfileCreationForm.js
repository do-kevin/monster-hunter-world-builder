import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  TextField, withStyles, Button, Grid,
} from "@material-ui/core";
import { Formik } from "formik";

import { updateProfile, grabId } from "redux/state/profile/Actions";
import { createProfile } from "services/ProfileApi";
import CenterPaper from "components/layout/CenterPaper";

const styles = () => ({});

function ProfileCreationForm(props) {
  const {
    classes, userProfile, initCreation, changePage, setId,
  } = props;
  const userId = userProfile.user;

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
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
    </Grid>
  );
}

const componentWithStyles = withStyles(styles)(ProfileCreationForm);

function mapStateToProps(state) {
  return {
    userProfile: state.profile,
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

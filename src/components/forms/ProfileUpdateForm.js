import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  TextField, withStyles, Button, Grid,
} from "@material-ui/core";
import { Formik } from "formik";

import { updateProfileFromRequest } from "redux/state/profile/Actions";
import { updateProfile } from "services/ProfileApi";
import CenterPaper from "components/layout/CenterPaper";

const styles = () => ({
  picture: {
    width: "128px",
    height: "128px",
    borderRadius: "50%",
    border: "3px solid black",
  },
});

const txtfields = {
  width: "100%",
  marginTop: "25px",
};

function ProfileUpdateForm(props) {
  const { classes, userProfile, setNewProfileInfo } = props;
  const {
    first_name, last_name, birth_date, phone_number, id, user,
  } = userProfile;

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
            fname: first_name,
            lname: last_name,
            birthdate: birth_date,
            phonenum: phone_number,
          }}
          onSubmit={async (values) => {
            const {
              fname, lname, birthdate, phonenum,
            } = values;

            const response = await updateProfile(
              id,
              user,
              fname,
              lname,
              birthdate,
              phonenum,
            );
            setNewProfileInfo(response);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h2>Update your profile</h2>
              <img
                src="https://randomuser.me/api/portraits/lego/1.jpg"
                alt="avatar"
                className={classes.picture}
              />
              <TextField
                id="fname"
                label="First name"
                className={classes.TextField}
                style={txtfields}
                type="text"
                name="fname"
                autoComplete="fname"
                onChange={handleChange}
                value={values.fname}
              />
              <TextField
                id="lname"
                label="Last name"
                className={classes.TextField}
                style={txtfields}
                type="text"
                name="lname"
                autoComplete="lname"
                onChange={handleChange}
                value={values.lname}
              />
              <TextField
                id="birthdate"
                label="Birthday"
                className={classes.TextField}
                style={txtfields}
                type="date"
                name="birthdate"
                autoComplete="birthdate"
                onChange={handleChange}
                value={values.birthdate}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                id="phonenum"
                label="Phone number"
                className={classes.TextField}
                style={txtfields}
                type="text"
                name="phonenum"
                autoComplete="phonenum"
                onChange={handleChange}
                value={values.phonenum}
              />
              <Button
                color="primary"
                type="submit"
                variant="contained"
                style={{ marginTop: "25px" }}
              >
                  Update
              </Button>
            </form>
          )}
        </Formik>
      </CenterPaper>
    </Grid>
  );
}

const componentWithStyles = withStyles(styles)(ProfileUpdateForm);

function mapStateToProps(state) {
  return {
    userProfile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setNewProfileInfo: bindActionCreators(updateProfileFromRequest, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);

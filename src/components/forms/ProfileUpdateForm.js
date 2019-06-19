import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  TextField, withStyles, Button, Grid,
} from "@material-ui/core";
import { Formik } from "formik";

import { fullProfileUpdate, enhanceProfile } from "store/ducks/Profile";
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
  const { classes, profile, fullProfileUpdate } = props;
  const {
    first_name, last_name, birth_date, phone_number, id, user,
  } = profile;

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
            fname: first_name,
            lname: last_name,
            birthdate: birth_date,
            phonenum: phone_number,
          }}
          onSubmit={async (values) => {
            const {
              fname, lname, birthdate, phonenum,
            } = values;

            fullProfileUpdate(
              id,
              user,
              fname,
              lname,
              birthdate,
              phonenum,
            );
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
                className={classes.textField}
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
                className={classes.textField}
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
                className={classes.textfield}
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
                className={classes.textField}
                style={txtfields}
                type="text"
                name="phonenum"
                autoComplete="phonenum"
                onChange={handleChange}
                value={values.phonenum}
              />
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                style={{ marginTop: "25px", color: "white" }}
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

const mapStateToProps = state => ({ profile: enhanceProfile(state) });

const mapDispatchToProps = dispatch => ({
  fullProfileUpdate: bindActionCreators(fullProfileUpdate, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TextField, withStyles, Button } from "@material-ui/core";
import { Formik } from "formik";

import { putNewProfileInfo } from "Redux/state/profile/actions";
import { updateProfile } from "Services/Auth/RegistrationApi";
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

function UpdateProfile(props) {
  const { classes, reduxState, profileUpdate } = props;
  const {
    first_name, last_name, birth_date, phone_number, id, user,
  } = reduxState.profile;

  // const userGender = [
  //   {
  //     value: "male",
  //     label: "Male",
  //   },
  //   {
  //     value: "female",
  //     label: "Female",
  //   },
  // ];

  return (
    <div>
      <hr />
      <CenterPaper>
        <Formik
          initialValues={{
            fname: first_name,
            lname: last_name,
            birthdate: birth_date,
            phonenum: phone_number,
            // gender: reduxState.profile.gender,
          }}
          onSubmit={async (values) => {
            const {
              fname, lname, birthdate, phonenum,
              // gender,
            } = values;

            // let avatarUrl = null;

            // const randomNum = Math.floor(Math.random() * 100);

            // switch (gender) {
            //   case "male":
            //     avatarUrl = `https://randomuser.me/api/portraits/men/${randomNum}.jpg`;
            //     break;
            //   case "female":
            //     avatarUrl = `https://randomuser.me/api/portraits/women/${randomNum}.jpg`;
            //     break;
            //   default:
            //     avatarUrl = null;
            //     break;
            // }

            const response = await updateProfile(
              id,
              user,
              fname,
              lname,
              birthdate,
              phonenum,
            );

            // const newObj = await Object.assign(response, { gender });
            profileUpdate(response);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h2>Update your profile</h2>
              <img
                // src={avatar === null ? "https://randomuser.me/api/portraits/lego/1.jpg" : avatar}
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
              {/* <TextField
                id="gender"
                label="Gender"
                className={classes.TextField}
                style={{
                  width: "100%",
                  marginTop: "25px",
                  textAlign: "left",
                }}
                select
                type="text"
                name="gender"
                margin="normal"
                onChange={handleChange}
                value={values.gender}
              >
                {userGender.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField> */}
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
    </div>
  );
}

const componentWithStyles = withStyles(styles)(UpdateProfile);

function mapStateToProps(state) {
  return {
    reduxState: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    profileUpdate: bindActionCreators(putNewProfileInfo, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);

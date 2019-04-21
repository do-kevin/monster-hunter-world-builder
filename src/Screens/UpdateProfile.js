/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import { Formik } from "formik";
import { connect } from "react-redux";

import {} from "Services/Auth/RegistrationApi";
// import { AuthContext } from 'Authentication/AuthContext';
import { FETCH_PROFILE } from "Redux/actions/types";
import CenterPaper from "components/layout/CenterPaper";

const styles = () => ({});

const txtfields = {
  width: "100%",
  marginTop: "25px",
};

class UpdateProfile extends Component {
  // static contextType = AuthContext;

  async componentDidMount() {
    // const { userId, profileToken } = this.context;
    const { dispatch } = this.props;

    const response = await dispatch({
      type: FETCH_PROFILE,
    });

    console.log(response);
  }

  render() {
    // const { userId, profileToken } = this.context;
    const { classes } = this.props;
    return (
      <div>
        <hr />
        <CenterPaper>
          <Formik
            initialValues={{
              fname: "Redux state first name goes here",
              lname: "Redux state last name goes here",
              birthdate: "1994-03-25",
              phonenum: "",
            }}
            onSubmit={(values) => {
              const {
                fname, lname, birthdate, phonenum,
              } = values;
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
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
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </CenterPaper>
      </div>
    );
  }
}

const componentWithStyles = withStyles(styles)(UpdateProfile);

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

export default connect(mapStateToProps)(componentWithStyles);

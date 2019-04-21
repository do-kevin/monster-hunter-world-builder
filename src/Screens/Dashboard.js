import React, { Component } from "react";
import { withStyles, Toolbar, AppBar, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { AuthContext } from "Authentication/AuthContext";
// import { getProfile } from "services/RegistrationAPI";

import { logout } from "services/Auth/RegistrationApi";

import UpdateProfile from "screens/UpdateProfile";
import { GET_PROFILE } from "Redux/actions/types";
import { fetchProfileTemp } from "Redux/actions/profile";

const styles = () => ({});

class Dashboard extends Component {
  static contextType = AuthContext;

  state = {
    page: false
  };

  async componentDidMount() {
    // console.log(this.props);
    // console.log(this.context);
    // const { profileToken } = this.context;
    // await api.authInstance(profileToken);
    // console.log(this.props.userProfile);
    // const { userId, profileToken } = this.context;
    // const { dispatch } = this.props;
    // const response = await getProfileTemp(userId, profileToken);
    // console.log(fetchProfileTemp.toString())
    // await this.props.fetchProfileTemp();
    // dispatch({
    //   type: GET_PROFILE,
    //   payload: {
    //     user: response.data.user,
    //     first_name: response.data.first_name,
    //     last_name: response.data.last_name,
    //     birth_date: response.data.birth_name,
    //     phone_number: response.data.phone_number,
    //   },
    // });
  }

  // render() {
  //   return (
  //     <div>
  //       {this.props.userProfile.first_name}
  //     </div>
  //   )
  // }

  render() {
    const { history } = this.props;
    let renderPage;
    const { page } = this.state;
    if (page === "profileSettings") {
      renderPage = <UpdateProfile />;
    }
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button
                onClick={() => {
                  this.setState({ page: "profileSettings" });
                }}
              >
                Settings
              </Button>
              <Button onClick={() => logout()}>Log out</Button>
            </Grid>
          </Toolbar>
        </AppBar>
        Dashboard
        {renderPage}
      </div>
    );
  }
}

const componentWithStyles = withStyles(styles)(Dashboard);

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProfileTemp: bindActionCreators(fetchProfileTemp, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentWithStyles);

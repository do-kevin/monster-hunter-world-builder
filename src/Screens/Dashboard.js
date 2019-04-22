import React, { Component } from "react";
import {
  withStyles, Toolbar, AppBar, Button, Grid,
} from "@material-ui/core";
import { connect } from "react-redux";

import { logout, getProfile } from "Services/Auth/RegistrationApi";
import UpdateProfile from "Screens/UpdateProfile";

const styles = () => ({});

class Dashboard extends Component {
  state = {
    page: null,
  };

  async componentDidMount() {
    const { reduxState } = this.props;
    const { profile } = reduxState;
    const { user } = profile;
    const response = await getProfile(user);

    if (!response) {
      this.setState({ page: "profileSettings" });
    }
  }

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
              <Button onClick={() => logout(history.push("/"))}>Log out</Button>
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
    reduxState: state,
  };
}

export default connect(mapStateToProps)(componentWithStyles);

import React, { Component } from "react";
import {
  withStyles, Toolbar, AppBar, Grid,
} from "@material-ui/core";
import { PowerSettingsNew, Settings, Dashboard as DashboardIcon } from "@material-ui/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { logout } from "services/auth/RegistrationApi";
import { getProfile } from "services/ProfileApi";
import { fullyUpdateProfile, userLogout } from "redux/state/profile/Actions";
import { clearUserList } from "redux/state/list/Actions";
import { ProfileUpdateForm, ProfileCreationForm } from "components/forms";
import { Dashboard } from "screens";
import { SidebarBtn } from "components/buttons";

const styles = () => ({
  sidebar: {
    gridArea: "Menu",
    width: "110px",
    height: "100vh",
    left: "0",
  },
});

class Home extends Component {
  state = {
    page: "dashboard",
  };

  async componentDidMount() {
    const { loadProfile, userProfile } = this.props;
    const response = await getProfile();
    const { user } = userProfile;

    if (response === false) {
      this.setState({ page: "initProfile" });
    }

    const {
      id, first_name, last_name, birth_date, phone_number, avatar,
    } = response;
    await loadProfile(id, user, first_name, last_name, birth_date, phone_number, avatar);
  }

  render() {
    const {
      history, classes, signOut, emptyUserList,
    } = this.props;
    const { page } = this.state;
    let renderPage;

    switch (page) {
      case "initProfile":
        renderPage = <ProfileCreationForm changePage={() => this.setState({ page: "dashboard" })} />;
        break;
      case "profileSettings":
        renderPage = <ProfileUpdateForm />;
        break;
      case "dashboard":
        renderPage = <Dashboard />;
        break;
      default:
        renderPage = <Dashboard />;
        break;
    }

    return (
      <main className="home-grid">
        <AppBar
          className={classes.sidebar}
        >
          <Toolbar style={{ height: "100%" }}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
              style={{ height: "100%", left: "-24px", position: "relative" }}
            >
              <Grid>
                <SidebarBtn
                  color="secondary"
                  icon={<DashboardIcon />}
                  onClick={() => this.setState({ page: "dashboard" })}
                  disabled={page === "initProfile"}
                  divider
                />
                <SidebarBtn
                  color="secondary"
                  icon={<Settings />}
                  onClick={() => this.setState({ page: "profileSettings" })}
                />
              </Grid>
              <SidebarBtn
                color="secondary"
                icon={<PowerSettingsNew />}
                onClick={() => {
                  emptyUserList();
                  signOut();
                  logout(history.push("/"));
                }}
              />
            </Grid>
          </Toolbar>
        </AppBar>
        {renderPage}
      </main>
    );
  }
}

const componentWithStyles = withStyles(styles)(Home);

function mapStateToProps(state) {
  return {
    userProfile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProfile: bindActionCreators(fullyUpdateProfile, dispatch),
    signOut: bindActionCreators(userLogout, dispatch),
    emptyUserList: bindActionCreators(clearUserList, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);

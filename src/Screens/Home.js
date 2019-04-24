import React, { Component } from "react";
import {
  withStyles, Toolbar, AppBar, Grid, Button,
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

const styles = () => ({
  iconBtn: {
    margin: "3px 0",
    color: "hsl(0, 0%, 98%)",
    width: "110px",
    padding: "25px 5px",
  },
  gridDivider: {
    borderBottom: "1px ridge hsl(175, 100%, 15%)",
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
        <AppBar style={{ width: "110px", height: "100vh", left: "0" }}>
          <Toolbar style={{ height: "100%" }}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
              style={{ height: "100%", left: "-24px", position: "relative" }}
            >
              <Grid>
                <Grid
                  item
                  className={classes.gridDivider}
                >
                  <Button
                    className={classes.iconBtn}
                    onClick={() => this.setState({ page: "dashboard" })}
                    disabled={page === "initProfile"}
                  >
                    <DashboardIcon />
                  </Button>
                </Grid>
                <Grid
                  item
                >
                  <Button
                    className={classes.iconBtn}
                    onClick={() => {
                      this.setState({ page: "profileSettings" });
                    }}
                  >
                    <Settings />
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  className={classes.iconBtn}
                  onClick={() => {
                    logout(history.push("/"));
                    signOut();
                    emptyUserList();
                  }}
                >
                  <PowerSettingsNew />
                </Button>
              </Grid>
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

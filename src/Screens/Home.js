import React, { Component } from "react";
import {
  withStyles, Toolbar, AppBar, Grid, Button,
} from "@material-ui/core";
import { PowerSettingsNew, Settings, Dashboard as DashboardIcon } from "@material-ui/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { logout, getProfile } from "Services/Auth/RegistrationApi";
import { mountProfile, userLogout } from "Redux/state/profile/actions";
import { UpdateProfile, ProfileCreation } from "components/forms";
import { Dashboard } from "Screens";

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
    const { loadProfile, reduxState } = this.props;
    const response = await getProfile();
    const { user } = reduxState.profile;

    if (response === false) {
      this.setState({ page: "initProfile" });
    }

    const {
      id, first_name, last_name, birth_date, phone_number, avatar,
    } = response;
    await loadProfile(id, user, first_name, last_name, birth_date, phone_number, avatar);
  }

  home = () => this.setState({ page: "dashboard" });

  render() {
    const { history, classes, signOut } = this.props;
    const { page } = this.state;
    let renderPage;
    switch (page) {
      case "initProfile":
        renderPage = <ProfileCreation changePage={this.home} />;
        break;
      case "profileSettings":
        renderPage = <UpdateProfile />;
        break;
      case "dashboard":
        renderPage = <Dashboard />;
        break;
      default:
        renderPage = <Dashboard />;
        break;
    }

    return (
      <Grid container direction="row-reverse">
        <Grid item>
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
                      onClick={this.home}
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
                    }}
                  >
                    <PowerSettingsNew />
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid
          container
          spacing={24}
          justify="center"
          alignItems="center"
          direction="column"
          style={{ left: "5vw" }}
        >
          {renderPage}
        </Grid>
      </Grid>
    );
  }
}

const componentWithStyles = withStyles(styles)(Home);

function mapStateToProps(state) {
  return {
    reduxState: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProfile: bindActionCreators(mountProfile, dispatch),
    signOut: bindActionCreators(userLogout, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);

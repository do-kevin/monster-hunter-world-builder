import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "services/auth/PrivateRoute";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withStyles, Toolbar, AppBar, Grid,
} from "@material-ui/core";
import { PowerSettingsNew, Settings, Dashboard as DashboardIcon } from "@material-ui/icons";

import { logout } from "services/auth/RegistrationApi";
import { getProfile, userLogout } from "store/ducks/Profile";
import { clearUserList } from "store/ducks/List";
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
  async componentDidMount() {
    const {
      getProfile, history,
    } = this.props;
    const response = await getProfile();

    if (response === false) {
      history.push("/app/create-profile");
    } else {
      history.push("/app/dashboard");
    }
  }

  render() {
    const {
      history, classes, userLogout, clearUserList, location,
    } = this.props;
    const { pathname } = location;

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
                  to="/app/dashboard"
                  disabled={pathname === "/app/create-profile"}
                  divider
                />
                <SidebarBtn
                  color="secondary"
                  icon={<Settings />}
                  to="/app/settings"
                  disabled={pathname === "/app/create-profile"}
                />
              </Grid>
              <SidebarBtn
                color="secondary"
                icon={<PowerSettingsNew />}
                to=""
                onClick={() => {
                  clearUserList();
                  userLogout();
                  logout(history.push("/"));
                }}
              />
            </Grid>
          </Toolbar>
        </AppBar>
        <Switch>
          <PrivateRoute
            path="/app/create-profile"
            component={ProfileCreationForm}
          />
          <PrivateRoute
            path="/app/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            path="/app/settings"
            component={ProfileUpdateForm}
          />
        </Switch>
      </main>
    );
  }
}

const componentWithStyles = withStyles(styles)(Home);

const mapStateToProps = state => ({ profile: state.profile });

const mapDispatchToProps = dispatch => ({
  getProfile: bindActionCreators(getProfile, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch),
  clearUserList: bindActionCreators(clearUserList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);

import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "services/auth/PrivateRoute";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  withStyles, Toolbar, AppBar, Grid,
} from "@material-ui/core";
import {
  PowerSettingsNew, Settings,
  Dashboard as DashboardIcon,
  Build,
} from "@material-ui/icons";

import { logout } from "services/auth/RegistrationApi";
import { getProfile, userLogout } from "store/ducks/Profile";
import { clearUserList } from "store/ducks/List";
import { clearLoadouts } from "store/ducks/Loadouts";
import { clearWarehouse } from "store/ducks/Warehouse";
import { ParentGrid } from "components/StyledComponents";
import { ProfileUpdateForm, ProfileCreationForm } from "components/forms";
import { Dashboard, Forge } from "screens";
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

  clearAllOnLogout = () => {
    const {
      history, userLogout, clearUserList,
      clearLoadouts, clearWarehouse,
    } = this.props;

    clearUserList();
    clearLoadouts();
    clearWarehouse();
    userLogout();
    logout(history.push("/"));
  }

  render() {
    const {
      classes, location,
    } = this.props;
    const { pathname } = location;

    return (
      <ParentGrid>
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
                  icon={<Build />}
                  to="/app/forge"
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
                onClick={this.clearAllOnLogout}
              />
            </Grid>
          </Toolbar>
        </AppBar>
        <Switch>
          <PrivateRoute
            path="/app/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            path="/app/forge"
            component={Forge}
          />
          <PrivateRoute
            path="/app/settings"
            component={ProfileUpdateForm}
          />
          <PrivateRoute
            path="/app/create-profile"
            component={ProfileCreationForm}
          />
        </Switch>
      </ParentGrid>
    );
  }
}

const componentWithStyles = withStyles(styles)(Home);

const mapStateToProps = state => ({ profile: state.profile });

const mapDispatchToProps = dispatch => ({
  getProfile: bindActionCreators(getProfile, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch),
  clearUserList: bindActionCreators(clearUserList, dispatch),
  clearLoadouts: bindActionCreators(clearLoadouts, dispatch),
  clearWarehouse: bindActionCreators(clearWarehouse, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);

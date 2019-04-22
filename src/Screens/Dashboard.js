import React, { Component } from "react";
import {
  withStyles, Toolbar, AppBar, Button, Grid,
} from "@material-ui/core";

import { logout } from "Services/Auth/RegistrationApi";
import UpdateProfile from "Screens/UpdateProfile";

const styles = () => ({});

class Dashboard extends Component {
  state = {
    page: null,
  };

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

export default withStyles(styles)(Dashboard);

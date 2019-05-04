import React, { Component } from "react";
import {
  withStyles, AppBar, Toolbar,
} from "@material-ui/core";
import { bigStyles } from "screens/DashboardStyles";
import { search } from "services/OmdbApi";

class Movies extends Component {
  async componentDidMount() {
    const response = await search("Blade Runner");
    console.log(response);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="dashboard-grid">
        <div style={{ gridArea: "nav" }} />
        <AppBar className={classes.topbar}>
          <Toolbar className={classes.toolbar}>
            <p>Placeholder</p>
          </Toolbar>
        </AppBar>
        <main
          style={{
            gridArea: "List",
            width: "calc(97.5vw - 110px)",
            padding: "18px 18px 18px 17px",
          }}
        >
          Hello
        </main>
      </div>
    );
  }
}

export default withStyles(bigStyles)(Movies);

import React from "react";
import {
  withStyles,
} from "@material-ui/core";

const styles = () => ({
  toolbar: {
    height: "100%",
    background: "grey",
    width: "100vw",
  },
  content: {
    background: "white",
    width: "100vw",
    height: "100%",
  },
});

function Dashboard(props) {
  const { classes } = props;

  return (
    <div className="dashboard-grid">
      <div />
      <nav className={classes.toolbar}>
        Toolbar placeholder
      </nav>
      <div />
      <main className={classes.content}>
        Content placeholder
      </main>
    </div>
  );
}

export default withStyles(styles)(Dashboard);

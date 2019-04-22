import React from "react";
import {
  withStyles, Toolbar, AppBar, Grid,
} from "@material-ui/core";

const styles = () => ({
  container: {
    height: "100%",
    paddingLeft: "133px",
    zIndex: "-1",
  },
  toolbar: {
    background: "hsl(175, 5%, 75%)",
    paddingLeft: "110px",
  },
  mainSection: {
    border: "1px solid blue",
    width: "100%",
    height: "100vh",
    marginTop: "80px",
    position: "relative",
  },
});

function Dashboard(props) {
  const { classes } = props;

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <AppBar className={classes.toolbar}>
          <Toolbar style={{ border: "1px solid red" }} />
        </AppBar>
      </Grid>
      <Grid
        item
        className={classes.mainSection}
      >
        <main>
          Placeholder
        </main>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Dashboard);

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { withStyles, Grid, Paper } from "@material-ui/core/";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    height: "100vh",
    width: "100%",
  },
  paper: {
    padding: theme.spacing.unit * 7,
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "400px",
  },
});

class CenterPaper extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { classes, children } = this.props;

    return (
      <Grid
        container
        spacing={24}
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.root}
      >
        <Grid item>
          <Paper className={classes.paper}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CenterPaper);

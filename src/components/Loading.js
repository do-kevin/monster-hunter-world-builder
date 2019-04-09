/* eslint-disable react/prop-types */
import React from 'react';
import { withStyles, Grid } from '@material-ui/core/';

const styles = () => ({
  root: {
    height: '100vh',
    width: '100%',
  },
});

function Loading(props) {
  const { classes } = props;
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
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </Grid>
    </Grid>
  );
}


export default withStyles(styles)(Loading);

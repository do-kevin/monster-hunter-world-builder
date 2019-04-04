/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { parse } from 'query-string';
import { Grid, Paper, withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { verifyEmail } from 'Services/RegistrationAPI';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    padding: '10vh 10vw',
    marginTop: '15vh',
  },
});

class Verification extends Component {
  static propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
  };

  state = {
    isVerified: '',
    isRequesting: true,
    isRedirecting: false,
    profileToken: '',
    profileId: '',
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { location } = this.props;
    const parsed = parse(location.search);

    // eslint-disable-next-line camelcase
    const { token, user_id } = parsed;

    console.log(parsed);
    verifyEmail(user_id, token)
      .then((data) => {
        const { status } = data;
        const userToken = data.token;

        if (status === 'verified') {
          this.setState({
            isRequesting: false,
            profileToken: userToken,
            profileId: user_id
          });
          return (setTimeout(() => this.setState({
            isRedirecting: true,
          }), 25000));
        }

        return this.setState(() => ({ isVerified: status }));
      });
  }

  render() {
    const {
      isVerified, isRequesting, isRedirecting, profileToken, profileId,
    } = this.state;
    const { classes } = this.props;

    // eslint-disable-next-line one-var
    let prompt,
      loading;

    if (isVerified === 'verified') {
      prompt = (
        <section>
          <h1>Verified</h1>
        </section>
      );
    }

    if (isRequesting) {
      loading = <h6>Loading</h6>;
    } else {
      loading = <p>Your email has been verified. Redirecting you in 25 seconds.</p>;
    }

    if (isRedirecting) {
      return <Redirect to={`/create-account/${profileId}/${profileToken}`} />;
    }

    return (
      <Grid
        container
        spacing={24}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Paper className={classes.root}>
            {prompt}
            {loading}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Verification);

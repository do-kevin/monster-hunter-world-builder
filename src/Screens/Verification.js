/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { parse } from 'query-string';
import {
  Grid, withStyles, CircularProgress,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { AuthContext } from 'components/AuthContext';
import { verifyEmail } from 'Services/RegistrationAPI';
import PropTypes from 'prop-types';
import CenterPaper from 'components/layout/CenterPaper';
import * as Promise from 'bluebird';

const styles = theme => ({
  root: {
    padding: '10vh 10vw',
    marginTop: '15vh',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Verification extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      progress: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  static contextType = AuthContext;

  state = {
    isRequesting: true,
    isRedirecting: false,
    profileToken: false,
    profileId: false,
    firstToken: '',
  };

  async componentDidMount() {
    console.log(this.props);
    const { location } = this.props;
    const parsed = parse(location.search);
    const { token, user_id } = parsed; // eslint-disable-line camelcase
    this.setState({ firstToken: token });

    const result = await verifyEmail(user_id, token);

    const { setProfileId, setUserId } = this.context;

    if (result.status === 'verified') {
      this.setState({
        isRequesting: false,
      });
      Promise.delay(4000).then(() => {
        this.setState({
          profileId: true,
        });
        setUserId(user_id);
      });
      Promise.delay(7000).then(() => {
        this.setState({
          profileToken: true,
        });
        setProfileId(result.token);
      });
      Promise.delay(10000).then(() => {
        this.setState({
          isRedirecting: true,
        });
      });
    }
  }

  render() {
    const {
      isRedirecting, profileToken, profileId, firstToken,
    } = this.state;
    const { classes } = this.props;

    let loading;

    if (!isRedirecting) {
      loading = 'Please wait while we verify your email.';
    }

    if (profileId) {
      loading = 'Retrieving email information. Please wait.';
    }

    if (profileToken) {
      loading = 'Email processed. Redirecting you in three seconds.';
    }

    if (isRedirecting) {
      return <Redirect to={`/confirm-password/${firstToken}`} />;
    }

    return (
      <CenterPaper>
        <Grid item>
          <div>
            <h3>{loading}</h3>
            <div style={{ margin: 'auto', width: '74px' }}>
              <CircularProgress
                className={classes.progress}
                color="secondary"
              />
            </div>
          </div>
        </Grid>
      </CenterPaper>
    );
  }
}

export default withStyles(styles)(Verification);

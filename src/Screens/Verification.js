/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { parse } from 'query-string';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { verifyEmail } from 'Services/RegistrationAPI';

class Verification extends Component {
  state = {
    isVerified: '',
    isRequesting: true,
    isRedirecting: false,
    profileToken: '',
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
          });
          return (setTimeout(() => this.setState({
            isRedirecting: true,
          }), 25000));
        }

        return this.setState(() => ({ isVerified: status }));
      });
  }

  render() {
    const { isVerified, isRequesting, isRedirecting } = this.state;

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
      return <Redirect to="/" />;
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
          <div style={{
            color: 'white', fontSize: '72px', margin: 'auto', width: '700px',
          }}
          >
            Confirmation Page
            {prompt}
            {loading}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Verification;

/* eslint-disable no-console */
import React, { Component } from 'react';
import { parse } from 'query-string';
import { verifyEmail } from 'Services/RegistrationAPI';

class Verification extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { location } = this.props;
    const parsed = parse(location.search);

    // eslint-disable-next-line camelcase
    const { token, user_id } = parsed;

    console.log(parsed);
    verifyEmail(user_id, token);
  }

  render() {
    return <div style={{ color: 'white', fontSize: '72px' }}>Confirmation Page</div>;
  }
}

export default Verification;

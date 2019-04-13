import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { AuthContext } from 'Authentication/AuthContext';
import { getProfile } from 'Services/RegistrationAPI';

const styles = () => ({});

class Dashboard extends Component {
  static contextType = AuthContext;

  async componentDidMount() {
    const { userId, profileToken } = this.context;
    const { dispatch } = this.props;

    const response = await getProfile(userId, profileToken);

    dispatch({
      type: 'GET_PROFILE',
      payload: {
        user: response.data.user,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        birth_date: response.data.birth_name,
        phone_number: response.data.phone_number,
      },
    });
  }

  render() {
    return (
      <div>
        Dashboard
      </div>
    );
  }
}

const componentWithStyles = withStyles(styles)(Dashboard);

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

export default connect(mapStateToProps)(componentWithStyles);

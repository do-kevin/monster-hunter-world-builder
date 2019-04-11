/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  setProfileId = (tokenString = '') => {
    this.setState({ profileId: tokenString });
  }

  setUserId = (idString = '') => {
    this.setState({ userId: idString });
  }

  state = {
    profileId: '',
    userId: '',
    setProfileId: this.setProfileId,
    setUserId: this.setUserId,
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types

    return (
      <AuthContext.Provider value={this.state}>
        {children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };

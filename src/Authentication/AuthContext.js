/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  setProfileToken = (tokenString = '') => {
    this.setState({ profileToken: tokenString });
  }

  setUserId = (idString = '') => {
    this.setState({ userId: idString });
  }

  state = {
    profileToken: '',
    userId: '',
    setProfileToken: this.setProfileToken,
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

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types

    return (
      <AuthContext.Provider>
        {children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };

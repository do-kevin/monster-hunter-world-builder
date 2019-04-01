import React, { Component } from 'react';
import { registerEmail } from './RegistrationAPI';

class LoginModal extends Component {
  state = {
    email: ''
  }

  createUser = () => {
    return registerEmail(this.state.email);
  }

  render() {
    return (
      <div>
        <button onClick={this.createUser}>Register Email</button>
      </div>
    )
  }
}

export default LoginModal;
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
        <main className="loginContainer">
          <h1>Sign Up</h1>
          <button 
            onClick={this.createUser}
            className="loginContainer__registerEmail-btn">
            Register Email
          </button>
        </main>
      </div>
    )
  }
}

export default LoginModal;
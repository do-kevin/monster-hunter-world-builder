import React, { Component } from "react";

import { AuthContext } from "services/auth/AuthContext";
import queryString from "query-string";

import CenterPaper from "components/layout/CenterPaper";
import {
  Signin, Signup, ResetPassword, Verification,
} from "components/forms";

class LoginRegistration extends Component {
  static contextType = AuthContext;

  render() {
    const { match, location } = this.props;
    const { auth_type } = match.params;
    let form;
    switch (auth_type) {
      case "reset_password":
        form = <ResetPassword />;
        break;
      case "signup":
        form = <Signup />;
        break;
      case "account_verification":
        // eslint-disable-next-line no-case-declarations
        const { user_id = null, token = null } = queryString.parse(
          location.state.credentials,
        );
        form = <Verification user_id={user_id} token={token} />;
        break;
      default:
        form = <Signin />;
    }

    return <CenterPaper>{form}</CenterPaper>;
  }
}

export default LoginRegistration;

import React from "react";
import queryString from "query-string";

import CenterPaper from "components/layout/CenterPaper";
import {
  Signin, Signup, ResetPassword, Verification,
} from "components/forms";
import { Popup } from "components/modals";

function LoginRegistration(props) {
  const { match, location } = props;
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
      const { user_id = null, token = null } = queryString.parse(
        location.state.credentials,
      );
      form = <Verification user_id={user_id} token={token} />;
      break;
    default:
      form = <Signin />;
  }

  return (
    <CenterPaper>
      {form}
      <Popup />
    </CenterPaper>
  );
}

export default LoginRegistration;

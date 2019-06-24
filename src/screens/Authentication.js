import React, { useEffect } from "react";
import queryString from "query-string";

import CenterPaper from "components/layout/CenterPaper";
import {
  Signin, Signup, ResetPassword, Verification,
} from "components/forms";
import { toast } from "react-toastify";

function LoginRegistration(props) {
  useEffect(() => {
    toast.info("This website is using LogRocket to watch any errors that appear during your visit", {
      autoClose: false,
      position: toast.POSITION.BOTTOM_RIGHT,
      draggable: true,
    });
  }, []);

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
    </CenterPaper>
  );
}

export default LoginRegistration;

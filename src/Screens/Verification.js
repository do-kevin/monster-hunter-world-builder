import React, { Component } from "react";
import { parse } from "query-string";
import { verifyEmail } from "Services/RegistrationAPI";

class VerificationScreen extends Component {
  componentDidMount() {
    const { location } = this.props;
    const parsed = parse(location.search);

    const { token, user_id } = parsed;

    console.log(parsed);
    verifyEmail(user_id, token);
  }

  render() {
    return (
      <div style={{ color: "white", fontSize: "72px" }}>Confirmation Page</div>
      
    );
  }
}

export default VerificationScreen;

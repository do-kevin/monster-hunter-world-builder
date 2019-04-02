import React, {Component} from 'react';
import { parse } from 'query-string';

class VerificationScreen extends Component {

  componentDidMount() {
    const { location } = this.props;
    const parsed = parse(location.search);

    const { token, user_id } = parsed;

    console.log(token);
    console.log(user_id);
  }

  render () {
    return (
      <div style={{color: 'white', fontSize: '72px'}}>Confirmation Page</div>
    );
  }
}

export default VerificationScreen;
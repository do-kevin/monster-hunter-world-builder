import { Component } from 'react';

export default class DynamicImport extends Component {
  state = {
    component: null,
  }

  componentDidMount() {
    const { load } = this.props;
    load()
      .then(mod => this.setState({
        component: mod.default,
      }));
  }

  render() {
    const { children } = this.props;
    const { component } = this.state;

    return children(component);
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.scss';

const render = (Component) => {
  ReactDOM.render(
    <Router>
      <Component />
    </Router>,
    document.querySelector('#root'),
  );
};


render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = App.default;

    ReactDOM.render(<NextApp />, document.querySelector('#root'));
  });
}

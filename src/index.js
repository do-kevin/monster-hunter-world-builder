import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "redux/Store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "react-table/react-table.css";
import "./index.scss";

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.querySelector("#root"),
  );
};


render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default; // eslint-disable-line global-require
    render(NextApp);
  });
}

import React from "react";
import {
  Provider,
} from "react-redux";
import ReactDOM from "react-dom";
import Forge from "screens/Forge";
import configureStore from "store/Store";

const store = configureStore();

test("To render Forge without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Forge />
    </Provider>,
    div,
  );
});

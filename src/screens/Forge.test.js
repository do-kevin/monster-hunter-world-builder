import React from "react";
import {
  Provider,
} from "react-redux";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import Forge from "screens/Forge";
import configureStore from "store/Store";
import { render, fireEvent } from "@testing-library/react";

jest.unmock("axios");

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

test("Submitting a loadout name", () => {
  const domRender = render(
    <Provider store={store}>
      <Forge />
    </Provider>,
    { container: document.querySelector("#root") },
  );

  const { getByTestId } = domRender;
  const submitBtnNode = getByTestId("create-loadout-submit-btn");

  const inputNode = getByTestId("create-loadout-input");

  inputNode.value = "Jest loadout";
  Simulate.change(inputNode);

  fireEvent.click(submitBtnNode);
  expect(inputNode.value).toBe("Jest loadout");
});

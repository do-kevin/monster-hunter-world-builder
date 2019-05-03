import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "store/RootReducer";

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      reduxDevTools,
    ),
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("store/RootReducer", () => {
        store.replaceReducer(rootReducer);
      });
    }
  }
  return store;
};

export default configureStore;

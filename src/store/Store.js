import {
  createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "store/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
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

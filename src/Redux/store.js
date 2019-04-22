import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from 'Redux/state/profile/reducers';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const configureStore = () => {
  const store = createStore(
    profileReducer,
    compose(
      applyMiddleware(thunk),
      reduxDevTools,
    ),
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('Redux/state/profile/reducers', () => {
        store.replaceReducer(profileReducer);
      });
    }
  }
  return store;
};

export default configureStore;

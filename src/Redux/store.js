import { createStore, applyMiddleware, compose } from 'redux';
import profileReducer from 'Redux/state/ducks/profile/reducers';
import thunk from 'redux-thunk';

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
      module.hot.accept('Redux/reducers/reducers', () => {
        store.replaceReducer(profileReducer);
      });
    }
  }

  return store;
};

export default configureStore;

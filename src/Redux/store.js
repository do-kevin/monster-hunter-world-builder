/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import reducers from 'Redux/reducers/reducers';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const configureStore = () => {
  const store = createStore(reducers, reduxDevTools);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('Redux/reducers/reducers', () => {
        store.replaceReducer(reducers);
      });
    }
  }

  return store;
};

export default configureStore;

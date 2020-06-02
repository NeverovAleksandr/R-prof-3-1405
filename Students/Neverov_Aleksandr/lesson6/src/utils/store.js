import { createStore } from 'redux';
import initReducers from '../Reducers';

export default () => {
  const innitialStore = {};

  return createStore(
    initReducers,
    innitialStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
  );
};

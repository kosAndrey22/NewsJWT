import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import JWTNewsApp from './reducers';
import { axiosPosts} from './actions';
import App from "./components/App.js";

let store = createStore(JWTNewsApp, applyMiddleware(thunkMiddleware));
store.dispatch(axiosPosts(1, 10));
console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, 
  document.getElementById("root")
);
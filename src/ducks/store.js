import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

const rootReducer = combineReducers({ postReducer, authReducer });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

export default store;

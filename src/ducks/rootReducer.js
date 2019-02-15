import authReducer from "./authReducer";
import postReducer from "./postReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ postReducer, authReducer });

export default rootReducer;

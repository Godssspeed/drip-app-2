import axios from "axios";
const initialState = {
  user: {},
  error: "",
  loggedIn: false,
  userData: []
};

//Action Types
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";
const DELETE_POSTS = "DELETE_POSTS";
// Action Creators

export function register(username, password) {
  return {
    type: REGISTER,
    payload: axios.post("/auth/register", { username, password })
  };
}

export function login(username, password) {
  return {
    type: LOGIN,
    payload: axios.post("/auth/login", { username, password })
  };
}

export function getUser(username) {
  return {
    type: GET_USER,
    payload: axios.get(`/${username}`)
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: axios.post("/auth/logout")
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POSTS,
    payload: axios.delete(`/api/${id}`)
  };
}

// Export default function for Action Types/Action Creators
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case `${REGISTER}_FULFILLED`:
      return { ...state, user: action.payload.data };
    case `${LOGIN}_FULFILLED`:
      console.log(action.payload);
      return { ...state, user: action.payload.data, loggedIn: true };
    case `${LOGIN}_REJECTED`:
      return { ...state, error: "Username or Password is incorrect" };
    case `${GET_USER}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, userData: action.payload.data };
    case `${LOGOUT}_FULFILLED`:
      return { ...state, user: {}, loggedIn: false };
    case `${DELETE_POSTS}_FULFILLED`:
      return { ...state };
    default:
      return state;
  }
}

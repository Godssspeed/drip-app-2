import axios from "axios";
const initialState = {
  user: {},
  error: "",
  loggedIn: false,
  userData: [],
  isLoading: false,
  photosLoading: false,
  userPhotos: []
};

//Action Types
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const GET_USER = "GET_USER";
const GET_USER_PHOTOS = "GET_USER_PHOTOS";
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

export function getUserPhotos(username) {
  return {
    type: GET_USER_PHOTOS,
    payload: axios.get(`${username}/photos`)
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
    case `${GET_USER}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_USER}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, userData: action.payload.data, isLoading: false };
    case `${GET_USER_PHOTOS}_PENDING`:
      return { ...state, photosLoading: true };
    case `${GET_USER_PHOTOS}_FULFILLED`:
      return {
        ...state,
        userPhotos: action.payload.data,
        photosLoading: false
      };
    case `${LOGOUT}_FULFILLED`:
      return { ...state, user: {}, loggedIn: false };
    case `${DELETE_POSTS}_FULFILLED`:
      return { ...state };
    default:
      return state;
  }
}

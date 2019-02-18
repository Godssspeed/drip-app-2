import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: "",
  post: []
};

const GET_POSTS = "GET_POSTS";
const DELETE_POSTS = "DELETE_POSTS";
const CREATE_POST = "CREATE_POST";
const GET_POST = "GET_POST";

export function getPosts() {
  return {
    type: GET_POSTS,
    payload: axios.get("/api/posts")
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POSTS,
    payload: axios.delete(`/api/${id}`)
  };
}

export function createPost(url, caption) {
  return {
    type: CREATE_POST,
    payload: axios.post("/api/create", { url, caption })
  };
}

export function getPost(id) {
  return {
    type: GET_POST,
    payload: axios.get(`/api/${id}`)
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_POSTS}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_POSTS}_FULFILLED`:
      return { ...state, posts: action.payload.data, isLoading: false };
    case `${GET_POSTS}_REJECTED`:
      return { ...state, error: "Error Loading Posts" };
    case `${DELETE_POSTS}_FULFILLED`:
      return { ...state, posts: action.payload.data };
    case `${CREATE_POST}_FULFILLED`:
      return { ...state, posts: action.payload.data };
    case `${GET_POST}_FULFILLED`:
      return { ...state, post: action.payload.data };
    default:
      return state;
  }
}

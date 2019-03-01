import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: "",
  post: [],
  postComments: []
};

const GET_POSTS = "GET_POSTS";
const DELETE_POSTS = "DELETE_POSTS";
const CREATE_POST = "CREATE_POST";
const GET_POST = "GET_POST";
const DELETE_COMMENTS = "DELETE_COMMENTS";

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

export function deleteAllComments(id) {
  return {
    type: DELETE_COMMENTS,
    payload: axios.delete(`/api/post/delete/${id}`)
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
      console.log(action.payload.data);
      return { ...state, post: action.payload.data };
    case `${DELETE_COMMENTS}_FULFILLED`:
      return { ...state, postComments: action.payload.data };
    default:
      return state;
  }
}

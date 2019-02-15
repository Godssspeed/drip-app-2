import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: ""
};

const GET_POSTS = "GET_POSTS";
const DELETE_POSTS = "DELETE_POSTS";

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
    default:
      return state;
  }
}

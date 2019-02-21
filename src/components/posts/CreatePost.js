import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost, getPosts } from "../../ducks/postReducer";
import { Redirect } from "react-router-dom";
import Upload from "../react-s3/Upload";
import "./CreatePost.css";

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      caption: "",
      file: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { url, caption } = this.state;
    this.props.createPost(url, caption).then(response => {
      this.props.getPosts();
      return <Redirect to="/dashboard" />;
    });
  };

  render() {
    // const { auth } = this.props;
    console.log(this.state);
    if (this.props.loggedIn === false) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form
          onSubmit={this.handleSubmit}
          className="white"
          action="/create"
          method="post"
          encType="multipart/form-data"
        >
          <h5 className="grey-text text-darken-3">Create new Project</h5>
          <div className="input-field">
            <label htmlFor="url">Image URL: </label>
            <input type="text" id="url" onChange={this.handleChange} />
          </div>
          <Upload />
          <div className="input-field">
            <label htmlFor="caption">Make a Caption</label>
            <textarea
              id="caption"
              className="materialize-textarea"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, loggedIn } = state.authReducer;
  return {
    user,
    loggedIn
  };
};

export default connect(
  mapStateToProps,
  { createPost, getPosts }
)(CreatePost);

// const mapStateToProps = state => {
//   return {
//     auth: state.firebase.auth
//   };
// };

// const mapDispatchtoProps = dispatch => {
//   return {
//     createProject: project => dispatch(createProject(project))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchtoProps
// )(CreateProject);

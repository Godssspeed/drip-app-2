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

  render() {
    // const { auth } = this.props;
    // console.log(this.state);
    if (this.props.loggedIn === false) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <Upload />
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

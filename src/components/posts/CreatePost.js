import React, { Component } from "react";
import { connect } from "react-redux";
// import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createProject(this.state);
  };

  render() {
    // const { auth } = this.props;
    if (this.props.loggedIn === false) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create new Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea
              id="content"
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

export default connect(mapStateToProps)(CreatePost);

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

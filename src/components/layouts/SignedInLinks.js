import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser } from "../../ducks/authReducer";
// import { signOut } from "../../store/actions/authActions";

class SignedInLinks extends Component {
  constructor(props) {
    super(props);
  }

  visitProfile = username => {
    this.props.getUser(username).then(response => {
      console.log(response);
      // return <Redirect to={`/${username}`} />;
      // this.props.history.push(`/${username}`);
    });
    console.log(this.props.getUser(username));
  };

  render() {
    console.log(this.props.user.username);
    const { username } = this.props.user;
    return (
      <ul className="right">
        <li>
          <NavLink to="/create">New Post</NavLink>
        </li>
        <li>
          <NavLink to="signin">
            <span className="btn header-btn" onClick={this.props.logout}>
              Logout
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${username}`}>
            <span
              className="username"
              value={username}
              onClick={() => this.visitProfile(username)}
            >
              Profile
            </span>
          </NavLink>
        </li>
      </ul>
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
  { logout, getUser }
)(SignedInLinks);

// const mapDispatchToProps = dispatch => {
//   return {
//     signOut: () => dispatch(signOut())
//   };
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(SignedInLinks);

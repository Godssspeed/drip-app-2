import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser, getUserPhotos } from "../../ducks/authReducer";
import "./SignedInLinks.css";
// import { signOut } from "../../store/actions/authActions";

class SignedInLinks extends Component {
  visitProfile = username => {
    this.props.getUserPhotos(username).then(response => {
      this.props.getUser(username);
    });
  };

  render() {
    // console.log(this.props.user.username);
    const { username } = this.props.user;
    return (
      <ul className="nav-div">
        <li>
          <NavLink to="/create" className="pro-link-div">
            <img
              className="avatar-nav"
              src="https://s3.us-east-2.amazonaws.com/drip-project/admin/positive.png"
              alt="create new post"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${username}`} className="pro-link-div">
            <img
              className="avatar-nav"
              src="https://s3.us-east-2.amazonaws.com/drip-project/admin/user.png"
              alt={username}
              value={username}
              onClick={() => this.visitProfile(username)}
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="signin">
            <img
              className="logout"
              src="https://s3.us-east-2.amazonaws.com/drip-project/admin/logout.png"
              alt="logout"
              onClick={this.props.logout}
            />
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
  { logout, getUser, getUserPhotos }
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

import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../ducks/authReducer";
// import { signOut } from "../../store/actions/authActions";

const SignedInLinks = props => {
  console.log(props.user.username);
  return (
    <ul className="right">
      <li>
        <NavLink to="/create">New Post</NavLink>
      </li>
      <li>
        <NavLink to="signin">
          <span className="btn header-btn" onClick={props.logout}>
            Logout
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/${props.user.username}`}>Profile</NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = state => {
  const { user, loggedIn } = state.authReducer;
  return {
    user,
    loggedIn
  };
};

export default connect(
  mapStateToProps,
  { logout }
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

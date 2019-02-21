import React from "react";
import { NavLink } from "react-router-dom";
import "./signedoutlinks.css";
// import { connect } from "react-redux";
// import { signOut } from "../../store/actions/authActions";

const SignedOutLinks = () => {
  return (
    <ul>
      <li>
        <NavLink className="signedoutlinks" to="/signup">
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink className="signedoutlinks" to="/signin">
          Log in
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;

// const mapDispatchToProps = dispatch => {
//   return {
//     signOut: () => dispatch(signOut())
//   };
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(SignedInLinks);

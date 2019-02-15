import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import "./Navbar.css";

const Navbar = props => {
  //   const { auth } = props;
  console.log(props);
  const links = props.loggedIn ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="header">
      <Link to="/" className="brand-logo">
        <h1>Drip</h1>
      </Link>
      <div>{links}</div>
    </nav>
  );
};

const mapStateToProps = state => {
  const { user, loggedIn } = state.authReducer;
  return {
    user,
    loggedIn
  };
};

export default connect(mapStateToProps)(Navbar);

// const mapStateToProps = state => {
//   // console.log(state);

//   return {
//     auth: state.firebase.auth
//   };
// };

// export default connect(mapStateToProps)(Navbar);

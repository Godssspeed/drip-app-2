import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import "./Navbar.css";

const Navbar = props => {
  //   const { auth } = props;
  // console.log(props);
  const links = props.loggedIn ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="header">
      <Link to="/" className="brand-logo">
        <img
          className="logo"
          src="https://s3.us-east-2.amazonaws.com/drip-project/admin/7E7F2846-38EA-4CE0-92E6-AC2BB7D45EA9.png"
          alt="drip logo"
        />
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

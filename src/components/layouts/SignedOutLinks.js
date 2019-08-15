import React from 'react';
import { NavLink } from 'react-router-dom';
import './signedoutlinks.css';

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

import React, { Component } from "react";
import { register, login } from "../../ducks/authReducer";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import "./SignIn.css";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e, username, password) => {
    e.preventDefault();
    this.props.register(username, password).then(response => {
      this.props.login(username, password);

      if (username === response.value.data.username) {
        this.props.history.push("/");
      }
    });

    // this.clearInputs();
  };

  render() {
    // console.log(this.state);
    // console.log(this.props);
    const { username, password } = this.state;
    // const { authError, auth } = this.props;
    if (this.props.loggedIn) return <Redirect to="/" />;
    return (
      <div className="login-page">
        <form
          onSubmit={e => this.handleSubmit(e, username, password)}
          className="login-form"
        >
          <h5 className="userChange">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="username">Username: </label>
            <input
              className="input"
              type="username"
              id="username"
              placeholder=" username"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password"> Password: </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder=" password"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="input-field">
            {/* <Link to="/"> */}
            <button className="btn newUser-btn">SignUp</button>
            {/* </Link> */}
            <div className="login-err" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({ authReducer });

export default connect(
  mapStateToProps,
  { register, login }
)(SignUp);

// const mapStateToProps = state => {
//   return {
//     authError: state.auth.authError,
//     auth: state.firebase.auth
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     signIn: creds => dispatch(signIn(creds))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignUp);

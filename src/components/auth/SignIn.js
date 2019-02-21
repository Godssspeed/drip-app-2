import React, { Component } from "react";
import { login } from "../../ducks/authReducer";
import { connect } from "react-redux";
import "./SignIn.css";
// import { Redirect } from "react-router-dom";

class SignIn extends Component {
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
    this.props
      .login(username, password)
      .then(response => {
        if (username === response.value.data.username) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        window.alert("Wrong Username / Password combination");
      });
    // this.clearInputs();
  };

  render() {
    // console.log(this.state);
    // console.log(this.props);
    const { username, password } = this.state;
    // const { authError, auth } = this.props;
    // if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="login-page">
        <form
          onSubmit={e => this.handleSubmit(e, username, password)}
          className="login-form"
        >
          <h5 className="userChange">Sign In</h5>
          <div className="input-field">
            <input
              className="input"
              type="username"
              id="username"
              placeholder=" username"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="input-field">
            <input
              className="input"
              type="password"
              id="password"
              placeholder=" password"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="input-field">
            <button className="btn newUser-btn">Login</button>
            <div className="login-err">
              {/* {authError ? <p>{authError}</p> : null} */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({ authReducer });

export default connect(
  mapStateToProps,
  { login }
)(SignIn);

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
// )(SignIn);

import React, { Component } from 'react';
import { login } from '../../ducks/authReducer';
import { connect } from 'react-redux';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleLogin = (e, username, password) => {
    e.preventDefault();
    this.props
      .login(username, password)
      .then(response => {
        if (username === response.value.data.username) {
          // This pushes/Redirects to the '/' Route
          this.props.history.push('/');
        }
      })
      .catch(err => {
        window.alert('Wrong Username / Password combination');
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-page">
        <form
          onSubmit={e => this.handleLogin(e, username, password)}
          className="login-form animated rotateIn"
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
  { login }
)(SignIn);

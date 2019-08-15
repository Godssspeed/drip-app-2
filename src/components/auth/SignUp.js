import React, { Component } from 'react';
import { register, login } from '../../ducks/authReducer';
import { connect } from 'react-redux';
import './SignIn.css';

class SignUp extends Component {
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

  handleRegister = (e, username, password) => {
    e.preventDefault();
    this.props.register(username, password);
    this.props.history.push('/signin');
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-page">
        <form
          onSubmit={e => this.handleRegister(e, username, password)}
          className="login-form animated rotateIn"
        >
          <h5 className="userChange">Sign Up</h5>
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
            <button className="btn newUser-btn">SignUp</button>
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

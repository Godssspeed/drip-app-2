import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import { getUser, getUserPhotos } from '../../ducks/authReducer';
import Comments from '../comments/Comments';
import Like from '../Like/Like';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      redirect: false
    };
  }

  visitProfile = username => {
    this.props.getUser(username).then(response => {
      console.log(response);

      this.props
        .getUserPhotos(username)
        .then(response => {
          console.log(response);
        })
        .then(response => {
          this.setState({ redirect: true });
        });
    });
  };

  toggleLike = () => {
    this.setState({ liked: !this.state.liked });
  };

  render() {
    // console.log(this.props.user.username);
    const { username, img, caption, avatar, id, isLoading } = this.props;
    if (this.state.redirect) return <Redirect to={`/${username}`} />;
    return (
      <div>
        {isLoading ? (
          <Loader type="Circles" color="#a5d9fa" height="300" width="100" />
        ) : (
          <div className="post animated fadeInDownBig">
            <div className="user">
              <img
                className="avatar"
                src={
                  avatar
                    ? avatar
                    : 'https://asapct.org/wp-content/uploads/2016/02/blank-avatar.jpg'
                }
                alt={`${username}'s avatar.`}
              />

              <span
                className="username"
                value={username}
                onClick={() => this.visitProfile(username)}
              >
                {username}
              </span>
            </div>
            <img
              className="post-img animated pulse delay-1s"
              src={img}
              alt={`${username}'s posts`}
            />
            <div className="like-section">
              <Like id={id} />
            </div>
            <div className="caption-section">
              <span className="caption-username">{username}</span>
              <p className="caption">{caption}</p>
            </div>
            <div className="comment-section">
              <Comments id={id} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authReducer;
  const { isLoading } = state.postReducer;
  return {
    user,
    isLoading
  };
};

export default connect(
  mapStateToProps,
  { getUser, getUserPhotos }
)(Post);

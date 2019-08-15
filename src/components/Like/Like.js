import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Like extends Component {
  constructor() {
    super();
    this.state = {
      likes: [],
      liked: false
    };
  }

  componentDidMount() {
    const { id, user } = this.props;
    axios.get(`/api/${id}/likes`).then(response => {
      this.setState({ likes: response.data[0] });
    });

    axios.get(`/api/${id}/like/user`).then(response => {
      // console.log(response.data.hasOwnProperty("0"));
      // console.log(response);

      if (response.data.hasOwnProperty('0') === false) {
        delete response.data;
      }
      //Checks if user liked post already
      if (response.data && response.data[0].user_id) {
        if (user.id === response.data[0].user_id) {
          this.setState({ liked: true });
        }
      }
    });
  }

  getLikes = () => {
    const { id } = this.props;
    axios.get(`/api/${id}/likes`).then(response => {
      this.setState({ likes: response.data[0] });
    });
  };

  LikeAction = () => {
    const { id } = this.props;
    axios.post(`/api/${id}/like`).then(response => {
      this.getLikes();
      this.setState({ liked: true });
    });
  };

  //Delete like from DB so count will drop by 1
  deleteLike = () => {
    axios.delete('/api/like/delete').then(response => {
      this.getLikes();
      this.setState({ liked: false });
    });
  };

  render() {
    // console.log(this.state);
    const { likes } = this.state;
    console.log(likes);
    const unliked =
      'https://s3.us-east-2.amazonaws.com/drip-project/admin/drop-like-filled.png';
    const liked =
      'https://s3.us-east-2.amazonaws.com/drip-project/admin/drop-like-unfilled-white.png';
    return (
      //Conditionally rendering Like functions based on if post was liked
      <div>
        {!this.state.liked ? (
          <div className="like-border" onClick={this.LikeAction}>
            <img className="like-btn" src={unliked} alt="Like button" />
            <span className="numOfLikes">{likes.count}</span>
          </div>
        ) : (
          <div className="like-border liked" onClick={this.deleteLike}>
            <img className="like-btn" src={liked} alt="Like Button" />
            <span className="numOfLikes">{likes.count}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authReducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(Like);

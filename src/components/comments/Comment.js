import React, { Component } from 'react';
import { connect } from 'react-redux';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  editChange = () => {
    //Used to add some conditional rendering
    this.setState({ edit: !this.state.edit });
  };

  render() {
    const more =
      'https://s3.us-east-2.amazonaws.com/drip-project/admin/four-dots-horizontally-aligned-as-a-line.png';
    const { edit } = this.state;
    const { key, username, user_text, id, user, deleteFn } = this.props;
    return (
      <div className="comments animated fadeInUp" key={key}>
        <p>
          <span className="comment-user">{username}</span>
          <span className="user-text">{user_text}</span>
        </p>
        <div className="edit-section">
          {user.username === username && edit === true ? (
            //If User's username (that's logged in) matches the username on the comment they can edit/delete comment / if not they don't have the option to
            <span className="edit">
              <button className="cancel-btn" onClick={this.editChange}>
                Cancel
              </button>
              <button
                className="delete-btn"
                value={id}
                onClick={e => deleteFn(e.target.value)}
              >
                Delete
              </button>
            </span>
          ) : user.username === username ? (
            <img
              className="more-icon"
              src={more}
              alt="more"
              onClick={this.editChange}
            />
          ) : null}
        </div>
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

export default connect(mapStateToProps)(Comment);

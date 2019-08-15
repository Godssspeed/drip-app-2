import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Comment from './Comment';
import './Comments.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      user_text: '',
      edit: false
    };
  }

  componentDidMount(props) {
    //Get Request that loads comments when the component mounts and sets it to State
    const { id } = this.props;
    axios.get(`/api/${id}/comments`).then(response => {
      // console.log(response);
      this.setState({ comments: response.data });
    });
  }

  getComments = () => {
    //Used to refresh comments when ever a user creates a comment
    const { id } = this.props;
    axios.get(`/api/${id}/comments`).then(response => {
      // console.log(response);
      this.setState({ comments: response.data });
    });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  clearInputs = () => {
    this.setState({ user_text: '' });
  };

  createComment = e => {
    e.preventDefault();
    const { user_text } = this.state;
    const { id } = this.props;
    axios.post(`/api/${id}/create/comment`, { user_text }).then(response => {
      this.getComments();
      this.clearInputs();
    });
  };

  deleteComment = id => {
    axios.delete(`/api/delete/${id}`).then(response => {
      // console.log(response);
      this.getComments();
      this.setState({ edit: false });
    });
  };

  render() {
    // console.log(this.props);
    const { comments } = this.state;
    const commentList = comments.map((e, i) => {
      // console.log(i);
      //This function is used to map over comments from State to render each comment in its own Component
      return (
        <Comment
          key={i}
          username={e.username}
          user_text={e.user_text}
          id={e.id}
          deleteFn={this.deleteComment}
        />
      );
    });
    return (
      <div>
        <div className="comment-styling">{commentList}</div>
        <form onSubmit={this.createComment}>
          <input
            className="comment-input"
            type="text"
            id="user_text"
            autoComplete="off"
            value={this.state.user_text}
            placeholder="Add a comment..."
            onChange={e => this.handleChange(e)}
          />
        </form>
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

export default connect(mapStateToProps)(Comments);

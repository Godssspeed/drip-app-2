import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../ducks/authReducer";
import Comments from "../comments/Comments";
import "./Post.css";
// import ProjectSummary from "./ProjectSummary";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
  }

  visitProfile = username => {
    this.props.getUser(username).then(response => {
      console.log(response);
      // return <Redirect to={`/${username}`} />;
      // this.props.history.push(`/${username}`);
    });
    console.log(this.props.getUser(username));
  };

  toggleLike = () => {
    this.setState({ liked: !this.state.liked });
  };

  render() {
    console.log(this.props.user.username);
    const { username, img, caption, date, time, avatar, user, id } = this.props;
    const unliked =
      "https://s3.us-east-2.amazonaws.com/drip-project/admin/drop-like-filled.png";
    const liked =
      "https://s3.us-east-2.amazonaws.com/drip-project/admin/drop-like-unfilled-white.png";
    return (
      <div className="post">
        <div className="user">
          <img className="avatar" src={avatar} alt={`${username}'s avatar.`} />
          <Link to={`/${username}`} className="username">
            <span
              className="username"
              value={username}
              onMouseOver={() => this.visitProfile(username)}
              onMouseOut={() => this.visitProfile(user.username)}
            >
              {username}
            </span>
          </Link>
        </div>
        <img className="post-img" src={img} alt={`${username}'s posts`} />
        {!this.state.liked ? (
          <div className="like-section">
            <div className="like-border" onClick={this.toggleLike}>
              <img className="like-btn" src={unliked} alt="Like button" />
              <span className="numOfLikes">34</span>
            </div>
          </div>
        ) : (
          <div className="like-section" onClick={this.toggleLike}>
            <div className="like-border liked">
              <img className="like-btn" src={liked} alt="Like Button" />
              <span className="numOfLikes">35</span>
            </div>
          </div>
        )}
        <div className="caption-section">
          <span className="caption-username">{username}</span>
          <p className="caption">{caption}</p>
        </div>
        <div className="comment-section">
          <Comments id={id} />
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

export default connect(
  mapStateToProps,
  { getUser }
)(PostList);

// const { posts } = this.props;
// console.log(posts);
// const timeline =
//   posts &&
//   posts.map(post => {
//     return (
//       <div className="post" key={posts.id}>
//         <div className="user">
//           <img
//             className="avatar"
//             src={post.avatar}
//             alt={`${post.username}'s avatar.`}
//           />
//           <h3 className="username">{post.username}</h3>
//         </div>
//         <img
//           className="post-img"
//           src={post.img}
//           alt={`${post.username}'s posts`}
//         />
//         <div className="caption-section">
//           <span className="like-btn">💧</span>
//           <p className="caption">{post.caption}</p>
//         </div>
//       </div>
//     );
//   });

// return { timeline };

import React, { Component } from "react";
import { connect } from "react-redux";
import "./Post.css";
// import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  visitProfile = e => {
    return <Link to={`/${e.target.value}`} />;
  };

  render() {
    console.log(this.props.user.username);
    const { username, img, caption, date, time, avatar } = this.props;
    return (
      <div className="post">
        <div className="user">
          <img className="avatar" src={avatar} alt={`${username}'s avatar.`} />
          {/* <Link to={`/${value}`}> */}
          <h3 className="username" value={username} onClick={this.visitProfile}>
            {username}
          </h3>
          {/* </Link> */}
        </div>
        <img className="post-img" src={img} alt={`${username}'s posts`} />
        <div className="caption-section">
          <span className="like-btn">💧</span>
          <p className="caption">{caption}</p>
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

export default connect(mapStateToProps)(PostList);

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

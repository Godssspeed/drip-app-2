// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { deletePost, getUser } from "../../ducks/authReducer";
// import { getPosts, getPost, deleteAllComments } from "../../ducks/postReducer";

// class Photo extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { id, url, handlePostGet, handleDelete } = this.props;
//     return (
//       <div key={id}>
//         <img
//           src={url}
//           onMouseOver={() => handlePostGet(id)}
//           onClick={this.openModal}
//           alt={this.props.userData[0].username}
//         />
//         {this.props.user.username === this.props.userData[0].username ? (
//           <button onClick={() => handleDelete(id)}>x</button>
//         ) : null}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   const { user, userData } = state.authReducer;
//   const { post } = state.postReducer;

//   return { user, userData, post };
// };

// export default connect(
//   mapStateToProps,
//   { deletePost, getPosts, getUser, getPost, deleteAllComments }
// )(Photo);

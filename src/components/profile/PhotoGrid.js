import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePost, getUser, getUserPhotos } from "../../ducks/authReducer";
import { getPosts, getPost, deleteAllComments } from "../../ducks/postReducer";
import Modal from "react-modal";
import Like from "../Like/Like";
import Comments from "../comments/Comments";

import "./PhotoGrid.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    borderRadius: "5px",
    transform: "translate(-50%, -50%)"
  }
};

class PhotoGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      focus: false,
      modalIsOpen: false,
      post: [],
      edit: false
    };
  }

  handleDelete = id => {
    const { username } = this.props.user;

    this.props.deleteAllComments(id).then(response => {
      this.props.deletePost(id);
      this.props.getUserPhotos(username).then(response => {
        console.log(response);
        this.setState({ userData: response.value.data });
      });
      this.closeModal();

      this.props.getPosts();
    });
  };

  handlePostGet = id => {
    this.props.getPost(id).then(response => {
      this.setState({ post: this.props.post });
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.

    this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  editChange = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    console.log(this.state.edit);
    const { photos, post, userPhotos, userData } = this.props;
    const more =
      "https://s3.us-east-2.amazonaws.com/drip-project/admin/four-dots-horizontally-aligned-as-a-line.png";
    const photoGrid = userPhotos.map(e => {
      return (
        <div key={e.id} className="animated bounceInLeft">
          <img
            src={e.url}
            onMouseOver={() => this.handlePostGet(e.id)}
            onClick={this.openModal}
            alt={userData.username}
          />
        </div>
      );
    });

    const postInfo = post.map(e => {
      return (
        <div key={e.id} className="post-modal">
          <img
            className="modal-img"
            src={e.url}
            alt={`${e.username}'s posts`}
          />
          <div className="action-styling animated slideInUp">
            <div className="edit-post-modal">
              {this.props.user.username === this.props.userData[0].username &&
              this.state.edit ? (
                <span className="edit">
                  <button className="cancel-btn" onClick={this.editChange}>
                    Cancel
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => this.handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </span>
              ) : this.props.user.username ===
                this.props.userData[0].username ? (
                <img
                  className="more-icon"
                  src={more}
                  alt="more"
                  onClick={this.editChange}
                />
              ) : null}
            </div>
            <div className="caption-like-comment">
              <div className="caption-like">
                <div className="modal-caption">
                  <p className="caption">{e.caption}</p>
                </div>
                <div className="modal-like">
                  <Like id={e.id} />
                </div>
              </div>
              <div className="comment-section comment-section-modal">
                <Comments id={e.id} />
              </div>
            </div>
          </div>
        </div>
      );
    });

    console.log(this.props.post);
    return (
      <div className="photo-grid">
        {photoGrid}
        {/* {post && postInfo} */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)} className="modal">
            {post && postInfo}
          </h2>
        </Modal>
      </div>
    );
  }
}

const mapStateProps = state => {
  const { user, userData, userPhotos } = state.authReducer;
  const { post } = state.postReducer;

  return { user, userData, post, userPhotos };
};

export default connect(
  mapStateProps,
  { deletePost, getPosts, getUser, getPost, deleteAllComments, getUserPhotos }
)(PhotoGrid);

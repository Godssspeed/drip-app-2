import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getUserPhotos } from '../../ducks/authReducer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
// import Upload from "../../components/react-s3/Upload";
import PhotoGrid from './PhotoGrid';
import './Profile.css';
// import AvatarUpload from "../react-s3/AvatarUpload";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    borderRadius: '5px',
    transform: 'translate(-50%, -50%)'
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      full_name: '',
      bio: '',
      edit: false,
      likeView: false,
      modalIsOpen: false
    };
  }

  // componentDidMount() {
  //   const { username } = this.props.user;
  //   // const { news } = this.state;
  //   this.props.getUser(username);
  // }

  // componentDidUpdate(prevProps) {
  //   const { user } = this.props;
  //   // Typical usage (don't forget to compare props):
  //   console.log(prevProps.userData);
  //   console.log(this.props.userData);
  //   if (this.props.user.bio !== prevProps.user) {
  //     this.props.getUser(user.username);
  //   }
  // }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleEditProfile = e => {
    const { user } = this.props;
    const { full_name, bio } = this.state;
    e.preventDefault();
    axios.put(`/${user.username}/edit`, { full_name, bio }).then(response => {
      console.log(response);
      this.props.getUser(user.username);
      this.setState({ edit: false });
    });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.

    this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, edit: false });
  };

  render() {
    console.log(this.state);
    console.log(this.props.userData);
    const { userData, user } = this.props;
    const edit =
      'https://s3.us-east-2.amazonaws.com/drip-project/admin/edit.png';
    const close =
      'https://s3.us-east-2.amazonaws.com/drip-project/admin/close.png';

    if (this.props.loggedIn === false) return <Redirect to="/signin" />;
    return (
      <div className="profile">
        <div className="user-info animated bounceInRight">
          <img
            className="avatar-img"
            src={
              !userData[0].avatar
                ? 'https://asapct.org/wp-content/uploads/2016/02/blank-avatar.jpg'
                : userData[0].avatar
            }
            alt={`${userData[0].username}'s avatar`}
            onClick={
              user.username === userData[0].username ? this.openModal : null
            }
          />
          <div className="user-snapshot">
            <div className="profile-username">
              <h1>{userData[0].username}</h1>

              {/* Deeply nested Conditional Rendering that gives edit options to user logged in on their own profiles */}
              {user.username !== userData[0].username ||
              (!userData[0].full_name && !userData[0].bio) ? null : this.state
                  .edit ? (
                <img
                  className="edit-btn"
                  src={close}
                  alt="cancel edit"
                  onClick={this.toggleEdit}
                />
              ) : (
                <img
                  className="edit-btn"
                  src={edit}
                  alt="edit profile"
                  onClick={this.toggleEdit}
                />
              )}
            </div>

            {user.username !== userData[0].username ? (
              <div className="bio-div">
                <span className="fullName">{userData[0].full_name}</span>
                <span className="bio">{userData[0].bio}</span>
              </div>
            ) : (!userData[0].bio && !userData[0].full_name) ||
              this.state.edit ? (
              <form className="edit-form" onSubmit={this.handleEditProfile}>
                {/* <input
                  placeholder={user.username}
                  // value={user.username}
                  id="username"
                  onChange={this.handleChange}
                /> */}
                <input
                  placeholder={
                    userData[0].full_name
                      ? userData[0].full_name
                      : 'Add your full name...'
                  }
                  id="full_name"
                  onChange={this.handleChange}
                />
                <input
                  placeholder={
                    userData[0].bio
                      ? userData[0].bio
                      : "Tell us why you're special"
                  }
                  id="bio"
                  onChange={this.handleChange}
                />
                <div className="edit-btns">
                  <button className="save-btn" onClick={this.toggleEdit}>
                    Add Later
                  </button>

                  <button className="save-btn" type="submit">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="bio-div">
                <span className="fullName">{userData[0].full_name}</span>
                <span className="bio">{userData[0].bio}</span>
              </div>
            )}
          </div>
        </div>
        {/* <div className="profile-nav">
          <div className="user-posts">
            <img
              src="https://s3.us-east-2.amazonaws.com/drip-project/admin/menu.png"
              alt="your posts"
            />
            <span>POSTS</span>
          </div>
          <div className="user-likes">
            <img
              src="https://s3.us-east-2.amazonaws.com/drip-project/admin/two-drops.png"
              alt="your posts"
            />
            <span>LIKED</span>
          </div>
        </div> */}
        <div className="modal-div">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            {' '}
            <h2 ref={subtitle => (this.subtitle = subtitle)} className="modal">
              {/* <AvatarUpload closeModal={this.closeModal} /> */}
            </h2>
          </Modal>
        </div>
        <div className="photo-grid-div">
          <PhotoGrid />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, userData, loggedIn, isLoading, userPhotos } = state.authReducer;
  return {
    user,
    userData,
    loggedIn,
    isLoading,
    userPhotos
  };
};

export default connect(
  mapStateToProps,
  { getUser, getUserPhotos }
)(Profile);

import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/authReducer";
import { Redirect } from "react-router-dom";
import PhotoGrid from "./PhotoGrid";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    const { userData, user } = this.props;
    const edit =
      "https://s3.us-east-2.amazonaws.com/drip-project/admin/edit.png";
    const close =
      "https://s3.us-east-2.amazonaws.com/drip-project/admin/close.png";

    const photoLoop = () => {
      let photos = [];
      for (let i = 0; i < userData.length; i++) {
        photos.push({
          id: userData[i].id,
          url: userData[i].url,
          username: userData[i].username
        });
      }
      return photos;
    };

    if (this.props.loggedIn === false) return <Redirect to="/signin" />;
    return (
      <div className="profile">
        <div className="user-info">
          <img
            className="avatar-img"
            src={
              !user.avatar && !userData[0]
                ? "https://asapct.org/wp-content/uploads/2016/02/blank-avatar.jpg"
                : userData[0]
                ? userData[0].avatar
                : user.avatar
            }
            alt={`${user.username}'s avatar`}
          />
          <div className="user-snapshot">
            <div className="username-div">
              <h1 className="profile-username">
                {userData[0] ? userData[0].username : user.username}
              </h1>
              {!user.username && !userData[0] ? null : user.username ===
                userData[0].username ? (
                <img
                  className="edit-btn"
                  src={edit}
                  alt="edit profile"
                  onClick={this.toggleEdit}
                />
              ) : (
                <img
                  className="edit-btn"
                  src={close}
                  alt="close edit"
                  onClick={this.toggleEdit}
                />
              )}
            </div>
            {!this.state.edit ? (
              <div className="bio-div">
                <p className="fullName">Nagato Uzumaki</p>
                <p className="bio">
                  Lorem ipsum dolor sit amet, suas fierent has no, ea aliquip
                  oporteat ullamcorper eam. Sit ad erant simul epicuri.{" "}
                </p>
              </div>
            ) : (
              <form className="edit-form">
                <input placeholder={user.username} />
                <input
                  placeholder={
                    user.fullName ? user.fullName : "Add your full name..."
                  }
                />
                <input
                  placeholder={
                    user.bio ? user.bio : "Tell us why you're special"
                  }
                />
                <button className="save-btn">Save Changes</button>
              </form>
            )}
            {/* <form>
              <input placeholder="Username" />
              <input placeholder="Full Name" />
              <input placeholder="Bio" />
            </form>
            <div className="bio-div">
              <p className="fullName">Nagato Uzumaki</p>
              <p>
                Lorem ipsum dolor sit amet, suas fierent has no, ea aliquip
                oporteat ullamcorper eam. Sit ad erant simul epicuri.{" "}
              </p>
            </div> */}
          </div>
        </div>
        <div className="photo-grid-div">
          <PhotoGrid username={user.username} photos={photoLoop(userData)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, userData, loggedIn } = state.authReducer;
  return {
    user,
    userData,
    loggedIn
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);

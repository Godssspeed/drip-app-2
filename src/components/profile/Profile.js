import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PhotoGrid from "./PhotoGrid";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.userData);
    const { userData, user } = this.props;
    console.log(userData);

    const photoLoop = () => {
      let photos = [];
      for (let i = 0; i < userData.length; i++) {
        photos.push({
          id: userData[i].id,
          url: userData[i].url
        });
      }
      return photos;
    };
    console.log(this.props.user);
    console.log(photoLoop(userData));
    if (this.props.loggedIn === false) return <Redirect to="/signin" />;
    return (
      <div className="profile">
        <div className="user-info">
          <img
            className="avatar-img"
            src={
              userData[0]
                ? userData[0].avatar
                : "https://asapct.org/wp-content/uploads/2016/02/blank-avatar.jpg"
            }
            alt={`${user.username}'s avatar`}
          />
          <div className="user-snapshot">
            <div className="username-div">
              <h1 className="profile-username">{user.username}</h1>
            </div>
            <div className="bio-div">
              <p className="fullName">Nagato Uzumaki</p>
              <p>
                Lorem ipsum dolor sit amet, suas fierent has no, ea aliquip
                oporteat ullamcorper eam. Sit ad erant simul epicuri.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="container">
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

export default connect(mapStateToProps)(Profile);

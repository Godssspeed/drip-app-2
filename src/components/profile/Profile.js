import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/authReducer";
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
          url: userData[i].url,
          username: userData[i].username
        });
      }
      return photos;
    };
    console.log(this.props);
    console.log(this.props.match.url);
    console.log(photoLoop(userData));
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

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);

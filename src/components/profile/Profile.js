import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/authReducer";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import PhotoGrid from "./PhotoGrid";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      full_name: "",
      bio: "",
      edit: false
    };
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   console.log(prevProps.userData);
  //   console.log(this.props.userData);
  //   if (this.props.userData[0].id !== prevProps.userData[0].id) {
  //     this.fetchData(this.props.userData);
  //   }
  // }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleEditProfile = e => {
    const { username } = this.props.user;
    const { full_name, bio } = this.state;
    e.preventDefault();
    axios.put(`/${username}/edit`, { full_name, bio }).then(response => {
      this.props.getUser(username);
      this.setState({ edit: false });
    });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    console.log(this.state);
    const { userData, user } = this.props;
    const edit =
      "https://s3.us-east-2.amazonaws.com/drip-project/admin/edit.png";
    const close =
      "https://s3.us-east-2.amazonaws.com/drip-project/admin/close.png";

    // const photoLoop = () => {
    //   let photos = [];
    //   for (let i = 0; i < userData.length; i++) {
    //     photos.push({
    //       id: userData[i].id,
    //       url: userData[i].url,
    //       username: userData[i].username
    //     });
    //   }
    //   return photos;
    // };

    if (this.props.loggedIn === false) return <Redirect to="/signin" />;
    return (
      <div className="profile">
        <div className="user-info">
          <img
            onClick="animated pulse"
            className="avatar-img"
            src={
              !userData[0].avatar
                ? "https://asapct.org/wp-content/uploads/2016/02/blank-avatar.jpg"
                : userData[0].avatar
            }
            alt={`${userData[0].username}'s avatar`}
          />
          <div className="user-snapshot">
            <div className="profile-username">
              <h1>{userData[0].username}</h1>
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

            {user.username !== userData[0].username ? null : (!userData[0]
                .bio &&
                !userData[0].full_name) ||
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
                    user.fullName ? user.fullName : "Add your full name..."
                  }
                  id="full_name"
                  onChange={this.handleChange}
                />
                <input
                  placeholder={
                    user.bio ? user.bio : "Tell us why you're special"
                  }
                  id="bio"
                  onChange={this.handleChange}
                />
                <button className="save-btn" onClick={this.toggleEdit}>
                  Add Later
                </button>
                <button className="save-btn" type="submit">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="bio-div">
                <p>
                  <span className="fullName">{userData[0].full_name}</span>
                  <span>{userData[0].bio}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="photo-grid-div">
          <PhotoGrid />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, userData, loggedIn, isLoading } = state.authReducer;
  return {
    user,
    userData,
    loggedIn,
    isLoading
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);

// {/* //   false ? (
// <form className="edit-form">
// <input
//      placeholder={
//         user.fullName
//          ? user.fullName
//          : "Add your full name..."
//      }
//    />
//    <input
//     placeholder={
//       user.bio ? user.bio : "Tell us why you're special"
//      }
//     />
//    <button className="save-btn">Add Later</button>
//     <button className="save-btn">Save Changes</button>
//  </form>
//                  ) : user.username === userData[0].username &&

//               // </div>
//               // {!userData[0].hasOwnProperty("bio") &&
//               // !userData[0].hasOwnProperty("fullName") &&
//               // user.username === userData[0].username ? (
//               //   <form className="edit-form">
//               //     <input
//               //       placeholder={
//               //         user.fullName ? user.fullName : "Add your full name..."
//               //       }
//               //     />
//               //     <input
//               //       placeholder={
//               //         user.bio ? user.bio : "Tell us why you're special"
//               //       }
//               //     />
//               //     <button className="save-btn">Add Later</button>
//               //     <button className="save-btn">Save Changes</button>
//               //   </form>
//               // ) : !this.state.edit ? (
//               //   <div className="bio-div">
//               //     <p className="fullName">{user.fullName}</p>
//               //     <p className="bio">{user.bio}</p>
//               //   </div>
//               // ) : (
//               //   <form className="edit-form">
//               //     <input placeholder={user.username} />
//               //     <input
//               //       placeholder={
//               //         user.fullName ? user.fullName : "Add your full name..."
//               //       }
//               //     />
//               //     <input
//               //       placeholder={
//               //         user.bio ? user.bio : "Tell us why you're special"
//               //       }
//               //     />
//               //     <button className="save-btn">Save Changes</button>
//               //   </form>
//               // )}
//               {/* <form>
//             <input placeholder="Username" />
//             <input placeholder="Full Name" />
//             <input placeholder="Bio" />
//           </form>
//           <div className="bio-div">
//             <p className="fullName">Nagato Uzumaki</p>
//             <p>
//               Lorem ipsum dolor sit amet, suas fierent has no, ea aliquip
//               oporteat ullamcorper eam. Sit ad erant simul epicuri.{" "}
//             </p>
//           </div> */}
//             // </div>
//           // </div>
//     //       <div className="photo-grid-div">
//     //         <PhotoGrid />
//     //       </div>
//     //     </div>
//     //   )}
//     // </div>

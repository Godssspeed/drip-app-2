import React, { Component } from "react";
// import Notifications from "./Notifications";
import PostList from "../posts/PostList";
import Profile from "../profile/Profile";
import { connect } from "react-redux";
import { getUser } from "../../ducks/authReducer";
import { getPosts } from "../../ducks/postReducer";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userData: [],
      display: false
    };
  }

  componentDidMount() {
    const { username } = this.props.user;
    // this.props.getUser().then(response => {
    //   console.log(response);
    //   this.setState({ user: response });
    // });

    this.props.getUser(username).then(response => {
      console.log(response);
      this.setState({ userData: response.value.data });
    });

    this.props.getPosts();
    // console.log(this.props.user);
  }

  render() {
    const { user } = this.state;
    if (this.props.loggedIn === false) return <Redirect to="/signin" />;
    console.log(this.state.userData);
    console.log(this.props);
    const { posts } = this.props;
    const timeline = posts.map((e, i) => {
      return (
        <PostList
          key={i}
          username={e.username}
          img={e.url}
          caption={e.caption}
          date={e.upload_date}
          time={e.upload_time}
          avatar={e.avatar}
          // posts={posts}
        />
      );
    });

    // const userProfile =
    //   user &&
    //   user.map(e => {
    //     return (
    //       <Profile
    //         key={user.id}
    //         img={user.url}
    //         username={user.username}
    //         avatar={user.avatar}
    //       />
    //     );
    //   });
    // console.log(this.state.user);
    return <div className="dashboard container">{timeline}</div>;
  }
}

const mapStateToProps = state => {
  const { user, userData, loggedIn } = state.authReducer;
  const { posts } = state.postReducer;
  return {
    user,
    userData,
    posts,
    loggedIn
  };
};

export default connect(
  mapStateToProps,
  { getPosts, getUser }
)(Dashboard);

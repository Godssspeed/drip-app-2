import React, { Component } from "react";
import axios from "axios";
// import Notifications from "./Notifications";
import PostList from "../posts/PostList";

import { connect } from "react-redux";
import { getUser } from "../../ducks/authReducer";
import { getPosts } from "../../ducks/postReducer";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";
import { Redirect } from "react-router-dom";
import NewsTicker from "../newsTicker/NewsTicker";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userData: [],
      display: false,
      news: []
    };
  }

  componentDidMount() {
    const { username } = this.props.user;
    // const { news } = this.state;
    this.props.getUser(username);

    // this.props.getUser(username);

    this.props.getPosts();
    // console.log(this.props.user);

    const api = "apiKey=45268a277b8743078aa774f07329ce3f";
    const url = `https://newsapi.org/v2/top-headlines?country=us&${api}`;
    axios
      .get(url)
      .then(response => {
        console.log(response);
        this.setState({ news: response.data.articles });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { news } = this.state;
    if (this.props.loggedIn === false || this.props.user === [])
      return <Redirect to="/signin" />;
    // console.log(this.state);
    // console.log(this.props);
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
          id={e.id}
        />
      );
    });

    const newsFeed = news.map((e, i) => {
      return (
        <NewsTicker
          id={i}
          title={e.title}
          url={e.url}
          description={e.description}
          publishedAt={e.publishedAt}
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
    return (
      <div className="dashboard-container">
        {timeline}
        <div className="footer">{newsFeed}</div>
      </div>
    );
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

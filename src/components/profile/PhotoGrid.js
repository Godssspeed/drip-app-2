import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePost, getUser } from "../../ducks/authReducer";
import { getPosts, getPost } from "../../ducks/postReducer";
import axios from "axios";
import "./PhotoGrid.css";

class PhotoGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      focus: false,
      post: []
    };
  }

  handleDelete = id => {
    const { username } = this.props;
    // console.log(props);
    this.props.deletePost(id).then(response => {
      console.log(response);
      // this.props.getUser().then(response => {
      //   console.log(response);
      //   this.setState({ user: response });
      // });

      this.props.getUser(username).then(response => {
        console.log(response);
        this.setState({ userData: response.value.data });
      });
      this.props.getPosts();
    });
  };

  handlePostGet = id => {
    this.props.getPost(id).then(response => {
      this.setState({ post: response.data });
    });
    this.setState({ focus: true });
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    const { photos } = this.props;
    console.log(photos);
    console.log(this.props.user.username);
    console.log(this.props.photos.username);
    const photoGrid = photos.map(e => {
      return (
        <div key={e.id}>
          <img src={e.url} onMouseOver={() => this.handlePostGet(e.id)} />
          {this.props.user.username === this.props.userData[0].username ? (
            <button onClick={() => this.handleDelete(e.id)}>x</button>
          ) : null}
        </div>
      );
    });

    // const photoGrid = photos.map((e, i) => {
    //   return (
    //     <div key={i}>
    //       <img src={url} alt={`${username}'s post`} />
    //       <button onClick={e => this.handleDelete(e.username, e.url)}>X</button>
    //     </div>
    //   );
    // });

    return <div className="photo-grid">{photoGrid}</div>;
  }
}

const mapStateProps = state => {
  const { user, userData } = state.authReducer;
  const { post } = state.postReducer;
  return { user, userData };
};

export default connect(
  mapStateProps,
  { deletePost, getPosts, getUser, getPost }
)(PhotoGrid);

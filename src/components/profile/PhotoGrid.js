import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePost, getUser } from "../../ducks/authReducer";
import { getPosts } from "../../ducks/postReducer";
import axios from "axios";
import "./PhotoGrid.css";

class PhotoGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
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

  render() {
    console.log(this.props);
    console.log(this.state);
    const { photos } = this.props;
    console.log(photos);

    const photoGrid = photos.map(e => {
      return (
        <div key={e.id}>
          <img src={e.url} />
          <button onClick={() => this.handleDelete(e.id)}>x</button>
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

const mapStateProps = state => state;

export default connect(
  mapStateProps,
  { deletePost, getPosts, getUser }
)(PhotoGrid);

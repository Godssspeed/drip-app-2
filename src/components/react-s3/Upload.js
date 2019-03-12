import React, { Component } from "react";
// import S3FileUpload from "react-s3";
import S3 from "aws-s3";
import { connect } from "react-redux";
import { createPost, getPosts } from "../../ducks/postReducer";
import { Redirect } from "react-router-dom";
// import { uploadFile } from "react-s3";
// import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from "./key";
import "./Upload.css";

const config = {
  bucketName: "drip-project",
  dirName: "images" /* optional */,
  region: "us-east-2",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
};

const S3Client = new S3(config);

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      caption: "",
      redirect: false
    };
  }
  upload = e => {
    console.log(e.target.files[0]);
    S3Client.uploadFile(e.target.files[0])
      .then(data => {
        console.log(data);
        this.setState({ url: data.location });
      })
      .catch(err => console.error(err));
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { url, caption } = this.state;
    this.props.createPost(url, caption).then(response => {
      this.props.getPosts().then(response => {
        this.setState({ redirect: true });
      });
    });
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    console.log(process.env.REACT_APP_AWS_ACCESS_KEY);
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <div className="upload-cont">
        <form onSubmit={this.handleSubmit}>
          <div className="aws-upload">
            <input
              className="inputFile"
              type="file"
              name="file"
              id="file"
              onChange={this.upload}
            />
            <label for="file" className="btn upload-btn animated zoomIn">
              <img
                className="upload-img"
                src="https://s3.us-east-2.amazonaws.com/drip-project/admin/insert-picture-icon.png"
                alt="upload photo"
              />{" "}
              Upload Photo
            </label>
          </div>
          <div className="input-field animated zoomInRight">
            <input
              placeholder="Add a caption..."
              id="caption"
              className="input"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field animated zoomInLeft">
            {/* <Link to="/"> */}
            <button type="submit" className="btn create-btn">
              Create
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.authReducer;
  return {
    user
  };
};

export default connect(
  mapStateToProps,
  { createPost, getPosts }
)(Upload);

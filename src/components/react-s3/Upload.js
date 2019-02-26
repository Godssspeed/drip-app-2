import React, { Component } from "react";
// import S3FileUpload from "react-s3";
import S3 from "aws-s3";
import { connect } from "react-redux";
import { createPost, getPosts } from "../../ducks/postReducer";

// import { uploadFile } from "react-s3";
import {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET,
  USER_ARN
} from "./key";
import axios from "axios";

const config = {
  bucketName: "drip-project",
  dirName: "images" /* optional */,
  region: "us-east-2",
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
};

const S3Client = new S3(config);

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      caption: ""
    };
  }
  upload = e => {
    console.log(e.target.files[0]);
    S3Client.uploadFile(e.target.files[0])
      .then(data => {
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
      this.props.getPosts();
      // return <Redirect to="/dashboard" />;
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <form
          onSubmit={this.handleSubmit}
          className="white"
          action="/create"
          method="post"
          encType="multipart/form-data"
        >
          <h5 className="grey-text text-darken-3">Create new Project</h5>
          <div className="aws-upload">
            <input type="file" onChange={this.upload} />
          </div>
          <div className="input-field">
            <label htmlFor="caption">Make a Caption</label>
            <textarea
              id="caption"
              className="materialize-textarea"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
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

{
  /* <div className="container">
  <form
    onSubmit={this.handleSubmit}
    className="white"
    action="/create"
    method="post"
    encType="multipart/form-data"
  >
    <h5 className="grey-text text-darken-3">Create new Project</h5>
    <div className="aws-upload">
      <input type="file" onChange={this.upload} />
    </div>
    <div className="input-field">
      <label htmlFor="url">Image URL: </label>
      <input type="text" id="url" onChange={this.handleChange} />
    </div>
    <div className="input-field">
      <label htmlFor="caption">Make a Caption</label>
      <textarea
        id="caption"
        className="materialize-textarea"
        onChange={this.handleChange}
      />
    </div>

    <div className="input-field">
      <button className="btn pink lighten-1 z-depth-0">Create</button>
    </div>
  </form>
</div>; */
}

//   singleFileChangedHandler = e => {
//     this.setState({
//       selectedFile: e.target.files[0]
//     });
//   };

//   singleFileUploadHandler = () => {
//     const data = new FormData();

//     // If file selected
//     if (this.state.selectedFile) {
//       data.append(
//         "profileImage",
//         this.state.selectedFile,
//         this.state.selectedFile.name
//       );
//       console.log(data);
//       axios
//         .post("/test/upload", data, {
//           headers: {
//             accept: "application/json",
//             "Accept-Language": "en-US,en;q=0.8",
//             "Content-Type": `multipart/form-data; boundary=${data._boundary}`
//           }
//         })
//         .then(response => {
//           if (200 === response.status) {
//             console.log(response);
//             // If file size is larger than expected.
//             if (response.data.error) {
//               if ("LIMIT_FILE_SIZE" === response.data.error.code) {
//                 window.alert("Max size: 2MB");
//               } else {
//                 console.log(response.data);
//                 // If not the given file type
//                 window.alert(response.data.error);
//               }
//             } else {
//               // Success
//               let fileName = response.data;
//               console.log("fileName", fileName);
//               window.alert("File Uploaded");
//             }
//           }
//         })
//         .catch(error => {
//           // If another error
//           window.alert(error);
//         });
//     } else {
//       // if file not selected throw error
//       window.alert("Please upload file");
//     }
//   };

//   render() {
//     console.log(this.state.selectedFile);
//     return (
//       <div>
//         <input type="file" onChange={this.singleFileChangedHandler} />
//         <button className="btn btn-info" onClick={this.singleFileUploadHandler}>
//           Upload!
//         </button>
//       </div>
//     );
//   }
// }
//   submitFile = e => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("file", this.state.file[0]);
//     axios
//       .post("/test/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       })
//       .then(response => {
//         console.log(response);
//       })
//       .catch(err => console.log(err));
//   };

//   handleFileUpload = e => {
//     this.setState({ file: e.target.files });
//   };

//   render() {
//     console.log(this.state.file);
//     return (
//       <div>
//         <form onSubmit={this.submitFile}>
//           <input
//             label="upload file"
//             type="file"
//             onChange={this.handleFileUpload}
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Upload;

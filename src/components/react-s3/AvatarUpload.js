// import React, { Component } from "react";
// // import S3FileUpload from "react-s3";
// import S3 from "aws-s3";
// import { connect } from "react-redux";
// import { getUser } from "../../ducks/authReducer";

// // import { uploadFile } from "react-s3";
// // import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from "./key";
// import "./Upload.css";
// import axios from "axios";

// const config = {
//   bucketName: "drip-project",
//   dirName: "images" /* optional */,
//   region: "us-east-2",
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
// };

// const S3Client = new S3(config);

// class Upload extends Component {
//   constructor() {
//     super();
//     this.state = {
//       url: ""
//     };
//   }
//   upload = e => {
//     console.log(e.target.files[0]);
//     S3Client.uploadFile(e.target.files[0])
//       .then(data => {
//         console.log(data);
//         this.setState({ url: data.location });
//       })
//       .catch(err => console.error(err));
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { url } = this.state;
//     const { user } = this.props;
//     axios
//       .put("/api/edit/avatar", { url })
//       .then(response => {
//         this.props.getUser(user.username);
//       })
//       .then(this.props.closeModal());
//   };

//   render() {
//     return (
//       <div className="upload-cont">
//         <form onSubmit={this.handleSubmit}>
//           <div className="aws-upload">
//             <input
//               className="inputFile"
//               type="file"
//               name="file"
//               id="file"
//               onChange={this.upload}
//             />
//             <label for="file" className="btn upload-btn animated zoomIn">
//               <img
//                 className="upload-img"
//                 src="https://s3.us-east-2.amazonaws.com/drip-project/admin/insert-picture-icon.png"
//                 alt="upload photo"
//               />{" "}
//               Upload Avatar
//             </label>
//           </div>

//           <div className="input-field animated zoomInLeft">
//             {/* <Link to="/"> */}
//             <button type="submit" className="btn create-btn avatar-btn">
//               Create
//             </button>
//             {/* </Link> */}
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   const { user } = state.authReducer;
//   return {
//     user
//   };
// };

// export default connect(
//   mapStateToProps,
//   { getUser }
// )(Upload);

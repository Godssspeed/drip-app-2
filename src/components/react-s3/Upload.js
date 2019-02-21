import React, { Component } from "react";

import { uploadFile } from "react-s3";
import { Secret_Access_Key } from "dotenv";

const config = {
  bucketName: "drip-project",
  dirName: "images" /* optional */,
  region: "us-east-2",
  accessKeyId: "AKIAI5TTYIWT2EZRW2TA",
  secretAccessKey: "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"
};

class Upload extends Component {
  upload(e) {
    console.log(e.target.files[0]);
    uploadFile(e.target.files[0], config)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.upload} />
      </div>
    );
  }
}

export default Upload;

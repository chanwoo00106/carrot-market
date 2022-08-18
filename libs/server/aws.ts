import AWS from "aws-sdk";

class Aws {
  static s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
  });

  private constructor() {}

  static getS3() {
    return this.s3;
  }
}

export default Aws;

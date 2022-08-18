import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import Aws from "@libs/server/aws";
import { v1 } from "uuid";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const s3 = Aws.getS3();

  if (!process.env.AWS_BUCKET) return res.status(500).json({ ok: false });

  console.log(req.body);

  const param: AWS.S3.Types.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET,
    Key: v1(),
    Body: req.body,
    ACL: "public-read",
    ContentType: "",
  };

  const result = await s3.upload(param).promise();

  console.log(result);

  return res.status(200).json({ ok: true, url: "" });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

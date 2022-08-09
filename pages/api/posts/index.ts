import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";

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
  const {
    body,
    session: { user },
  } = req;

  const post = await client.post.create({
    data: {
      question: body.question,
      user: {
        connect: { id: user?.id },
      },
    },
  });

  return res.status(200).json({ ok: true, post });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

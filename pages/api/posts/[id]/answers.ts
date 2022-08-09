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
    session: { user },
    query: { id },
    body: { answer },
  } = req;

  if (!id || !+id) return res.status(400).json({ ok: false });

  console.log(answer);

  const newAnswer = await client.answer.create({
    data: {
      answer,
      user: {
        connect: { id: user?.id },
      },
      post: {
        connect: {
          id: +id.toString(),
        },
      },
    },
  });

  return res.status(200).json({ ok: true, answer: newAnswer });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

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
    query: { id },
  } = req;

  if (!id || !+id) return res.status(400).json({ ok: false });

  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answer: {
        select: { user: { select: { id: true, name: true, avatar: true } } },
      },
      _count: {
        select: { answer: true, wondering: true },
      },
    },
  });

  return res.status(200).json({ ok: true, post });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

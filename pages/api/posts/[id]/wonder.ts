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
    session: { user },
  } = req;

  if (!id || !+id) return res.status(400).json({ ok: false });

  const alreadyExists = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: +id?.toString(),
    },
    select: { id: true },
  });

  if (alreadyExists) {
    await client.wondering.delete({ where: { id: alreadyExists.id } });
  } else
    await client.wondering.create({
      data: {
        user: { connect: { id: user?.id } },
        post: { connect: { id: +id.toString() } },
      },
    });

  return res.status(200).json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

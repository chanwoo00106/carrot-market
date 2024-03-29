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
  } = req;
  const reviews = await client.review.findMany({
    where: {
      createForId: user?.id,
    },
    include: { createBy: { select: { id: true, name: true, avatar: true } } },
  });

  return res.status(200).json({ ok: true, reviews });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

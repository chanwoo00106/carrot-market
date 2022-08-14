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
    body,
    session: { user },
  } = req;

  if (!id || !+id.toString()) return res.status(200).json({ ok: false });

  const message = await client.message.create({
    data: {
      message: body.message,
      stream: { connect: { id: +id.toString() } },
      user: { connect: { id: user?.id } },
    },
  });

  return res.status(200).json({ ok: true, stream: message });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

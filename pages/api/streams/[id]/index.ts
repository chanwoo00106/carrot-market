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

  if (!id || !+id.toString()) return res.status(200).json({ ok: false });

  const stream = await client.stream.findUnique({
    where: { id: +id.toString() },
  });

  if (!stream) res.status(400).json({ ok: false });

  return res.status(200).json({ ok: true, stream });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

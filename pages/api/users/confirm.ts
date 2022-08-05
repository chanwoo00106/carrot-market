import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: { payload: token },
    include: { user: true },
  });

  if (!exists) return res.status(401).json({ ok: false });

  req.session.user = {
    id: exists.userId,
  };

  await req.session.save();

  await client.token.deleteMany({
    where: { userId: exists.userId },
  });

  return res.status(200).json({ ok: true });
}

export default withApiSession(withHandler("POST", handler));

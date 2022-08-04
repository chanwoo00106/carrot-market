import { withIronSessionApiRoute } from "iron-session/next";
import twilio from "twilio";
import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

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

  console.log(req.session);

  return res.status(200).json({ ok: true });
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: process.env.SESSION_PASSWORD!,
});

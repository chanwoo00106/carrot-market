import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const data = req.body;

  if (!data.email && !data.phone)
    return res.status(400).json({ ok: false, message: "BadRequest" });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: { ...data },
          create: { name: "Anonymous", ...data },
        },
      },
    },
  });

  return res.json({ ok: true });
}

export default withHandler("POST", handler);

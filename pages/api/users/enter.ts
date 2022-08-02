import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function saveOrFindUser(email: string, phone: number) {
  return client.user.upsert({
    where: { ...(email ? { email } : { phone }) },
    create: { name: "Anonymous", ...(email ? { email } : { phone }) },
    update: {},
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  if (!data.email && !data.phone)
    return res.status(400).json({ message: "BadRequest" });

  const token = await client.token.create({
    data: {
      payload: "1234",
      user: {
        connectOrCreate: {
          where: { ...data },
          create: { name: "Anonymous", ...data },
        },
      },
    },
  });

  return res.json({});
}

export default withHandler("POST", handler);

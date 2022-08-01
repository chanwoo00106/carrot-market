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
  const { email, phone } = req.body;

  if (!email && !phone) return res.status(400).json({ message: "BadRequest" });

  const user = await saveOrFindUser(email, +phone);

  return res.json(user);
}

export default withHandler("POST", handler);

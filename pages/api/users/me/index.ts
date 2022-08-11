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

async function alreadyExistUser(
  res: NextApiResponse<ResponseType>,
  id: number | undefined,
  email: string,
  phone: string
) {
  const currentUser = await client.user.findUnique({
    where: { id },
  });

  const validUserEmail = await client.user.findUnique({
    where: { email: email || "" },
    select: { id: true },
  });
  const validUserPhone = await client.user.findUnique({
    where: { phone: phone || "" },
    select: { id: true },
  });

  console.log(currentUser?.id !== validUserEmail?.id);

  if (
    (validUserEmail && currentUser?.id !== validUserEmail?.id) ||
    (validUserPhone && currentUser?.id !== validUserPhone?.id)
  ) {
    res.json({ ok: false, error: "already in use" });
    return true;
  }
  return false;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const profile = await client.user.findFirst({
      where: { id: req.session.user?.id },
    });
    return res.status(200).json({ ok: true, profile });
  }

  const {
    body: { email, phone, name },
    session: { user },
  } = req;

  if (!email && !phone) return res.status(400).json({ ok: false });

  if (await alreadyExistUser(res, user?.id, email, phone)) return;

  await client.user.update({
    where: { id: user?.id },
    data: { name: name || undefined, email, phone },
  });

  return res.status(200).json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

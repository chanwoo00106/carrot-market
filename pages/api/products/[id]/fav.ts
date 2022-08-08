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

  const alreadyExists = await client.fav.findFirst({
    where: { productId: +id.toString() },
  });

  if (alreadyExists) {
    await client.fav.delete({ where: { id: alreadyExists.id } });
  } else
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: { id: +id.toString() },
        },
      },
    });

  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

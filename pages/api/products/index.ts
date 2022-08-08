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
  if (req.method === "GET") {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    return res.status(200).json({ ok: true, products });
  }

  const {
    body: { name, price, description },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "",
      user: { connect: { id: user?.id } },
    },
  });

  return res.status(200).json({ ok: true, product });
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

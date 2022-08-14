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
    session: { user },
    body: { name, price, description },
  } = req;

  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price: +price,
        description,
        user: { connect: { id: user?.id } },
      },
    });

    return res.status(200).json({ ok: true, stream });
  }

  const streams = await client.stream.findMany({});

  return res.status(200).json({ ok: true, streams });
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

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
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: { id: user?.id },
        },
      },
    });

    return res.status(200).json({ ok: true, post });
  } else {
    const {
      query: { latitude, longitude },
    } = req;

    if (!latitude || !longitude) return res.status(400).json({ ok: false });

    const parsedLatitude = parseFloat(latitude.toString());
    const parsedLongitude = parseFloat(longitude.toString());

    const posts = await client.post.findMany({
      include: {
        user: true,
        _count: { select: { answer: true, wondering: true } },
      },
      where: {
        latitude: {
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude - 0.01,
        },
        longitude: {
          gte: parsedLongitude - 0.01,
          lte: parsedLongitude + 0.01,
        },
      },
    });
    return res.status(200).json({ ok: true, posts });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

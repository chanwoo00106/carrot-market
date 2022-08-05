import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.SESSION_PASSWORD!,
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export function withApiSession(fn: NextApiHandler<any>) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

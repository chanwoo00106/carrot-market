import { NextApiRequest, NextApiResponse } from "next";

interface ConfigType {
  method: "GET" | "POST" | "DELETE";
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) => Promise<void>;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) return res.status(405).end();
    if (isPrivate && !req.session.user)
      return res.status(401).json({ ok: false });

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

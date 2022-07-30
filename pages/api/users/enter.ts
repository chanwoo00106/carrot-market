import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }

  console.log(req.body);
  res.json({ ok: true });
}

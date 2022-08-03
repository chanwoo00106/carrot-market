import twilio from "twilio";
import type { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;

  if (!email && !phone)
    return res.status(400).json({ ok: false, message: "BadRequest" });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: { ...(email ? { email } : { phone: +phone }) },
          create: {
            name: "Anonymous",
            ...(email ? { email } : { phone: +phone }),
          },
        },
      },
    },
  });

  if (phone)
    await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}.`,
    });

  return res.json({ ok: true });
}

export default withHandler("POST", handler);

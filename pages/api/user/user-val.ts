// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserValidate } from "../../../services/user.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const name = req.query.USER;
    const activity = req.query.ACTIVITY;

    const user = await getUserValidate({ name, activity });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

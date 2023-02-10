// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "../../../services/user.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { activity } = req.query;
    console.log(activity);

    const users = await getUsers(activity);

    res.status(200).json(users);
  } catch (err) {
    res.status(300).json(err);
    console.log(err);
  }
}

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
    const users = await getUsers({ nameActivity: String(activity) });

    res.status(200).json(users);
  } catch (err) {
    res.status(300).json({ err: err, msg: "Problema con la base de datos" });
    console.log(err);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteUser } from "../../../services/user.service";
import { deleteActivityService } from "../../../services/activity.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "DELETE") {
    try {
      const { _id } = req.query;
      const activity = await deleteActivityService({ _id });
      res.status(200).json(activity);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

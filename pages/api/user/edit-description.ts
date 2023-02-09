// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { editDescription } from "../../../services/user.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    const { id, description } = req.body;
    try {
      const user = await editDescription({ id, description });

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

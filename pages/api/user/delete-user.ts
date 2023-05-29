// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteUser } from "../../../services/user.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;

      const user = await deleteUser({ id: Number(id) });
      console.log(id);
      res.status(200).json(id);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

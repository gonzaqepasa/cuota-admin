// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { editName, editPhone } from "../../../services/user.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    const { id, phone } = req.body;
    try {
      const user = await editPhone({ id, phone });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ msg: "Error interno" });
      console.log(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

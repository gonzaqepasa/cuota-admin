// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { changeActivityService } from "../../../services/user.service";
import { typesUser } from "../../../src/types/types-user";

type Data = any | { msg: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    try {
      const { id_user, id_activity } = req.body;

      const data = await changeActivityService({ id_user, id_activity });
      console.log(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

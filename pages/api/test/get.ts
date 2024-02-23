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

    res.status(200).json({
      prueba: {
        saludo: "Hola",
        actividad: activity,
      },
    });
  } catch (err) {
    res.status(300).json({ err: err, msg: "Problema con la base de datos" });
    console.log(err);
  }
}

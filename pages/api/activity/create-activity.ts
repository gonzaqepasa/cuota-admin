// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createActivityService,
  editColor,
} from "../../../services/activity.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { color, price, nameActivity, modality } = req.body;

      const activity = await createActivityService({
        color,
        price,
        modality,
        nameActivity,
        id: 0,
      });

      res.status(200).json(activity);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

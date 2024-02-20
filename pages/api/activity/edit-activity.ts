// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { editActivity } from "../../../services/activity.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    try {
      const {
        _id,
        color,
        nameActivity,
        price,
        description,
        modality,
        CreatedAt,
        updatedAt,
      } = req.body;

      const activities = await editActivity({
        _id,
        color,
        nameActivity,
        price,
        description,
        modality,
        CreatedAt,
        updatedAt,
      });

      res.status(200).json(activities);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

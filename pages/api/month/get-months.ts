// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getMonths, payMonth } from "../../../services/month.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const { month } = req.query;
      const monthName = String(month);
      const months = await getMonths({ monthName, isPay: false });

      res.status(200).json(months);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

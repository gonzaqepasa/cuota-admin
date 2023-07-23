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
      const { month, ispay, adddate } = req.query;
      const monthName = month ? String(month) : undefined;
      const isPay = () => {
        if (ispay === "true") return true;
        if (ispay === "false") return false;
        return undefined;
      };
      const months = await getMonths({
        monthName,
        isPay: isPay(),
        addData: adddate,
      });

      res.status(200).json(months);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

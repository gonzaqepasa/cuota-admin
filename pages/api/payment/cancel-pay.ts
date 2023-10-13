// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import Payments from "../../../services/payments.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "DELETE") {
    try {
      const { userId, activityId, monthId } = req.body;
      const pay = await Payments.CancelPay({
        userId,
        activityId,
        monthId,
      });
      // console.log(req.body);
      res.status(200).json(pay);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}
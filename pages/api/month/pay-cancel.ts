// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { cancelPayMonth, payMonth } from "../../../services/month.service";
import Payments from "../../../services/payments.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    try {
      const { id, idToCancelPayments } = req.body;

      const month = await cancelPayMonth({ id });
      await Payments.CancelPay(idToCancelPayments);

      res.status(200).json(month);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

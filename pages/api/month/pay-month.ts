// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { payMonth } from "../../../services/month.service";
import Payments from "../../../services/payments.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    try {
      const { id, activityId, addAdmin, mothodPay, pricePay } = req.body;

      await payMonth({ id, addAdmin, mothodPay, pricePay });
      const payment = await Payments.pay({
        monthId: id,
        methodPay: mothodPay,
        addAdmin: String(addAdmin),
        pricePay: Number(pricePay),
        isPay: true,
        activityId,
      });
      console.log("Aca va lo que se usa para Pagar mes");
      console.table(payment);
      res.status(200).json(payment);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

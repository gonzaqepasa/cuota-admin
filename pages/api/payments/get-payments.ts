// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Payments from "../../../services/payments.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    ////// SEGUNDA CAPA (2°) --> Ruta
    // Aca se recibe las querys para enviar a la tercer capa (servicio)
    const { pricePay, monthId, activityId, methodPay, id, addData, addAdmin } =
      req.query;

    const toSend = {
      // Se filtran las querys necesarias
      // Se le da el formato requerido
      id: Number(id),
      pricePay: Number(pricePay),
      monthId: Number(monthId),
      activityId: Number(activityId),
      // methodPay: `${methodPay}`,
      addAdmin: addAdmin !== undefined ? `${addAdmin}` : undefined,
      addData: addData !== undefined ? `${addData}` : undefined,
      isPay: true,
    };
    //// coneccion a la tercer capa (servicio)
    console.table(toSend);
    const payments = await Payments.getPaymentsServices(toSend);
    res.status(200).json(payments);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

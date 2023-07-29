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
    const { pricePay, monthId, activityId, methodPay, addData, addAdmin } =
      req.query;
    const dateToPay = {
      // Convierto las datos llegados desde las querys para guardar en la bd
      // Filtro todas las querys que llegan y capturo solo las que nesecito
      pricePay: Number(pricePay),
      monthId: Number(monthId),
      activityId: Number(activityId),
      methodPay: `${methodPay}`,
      isPay: true,
      addData: String(addData),
      addAdmin: String(addAdmin),
    };
    //// coneccion a la tercer capa (servicio)
    // const payments = await Payments.getPaymentsServices(querysToSend);
    const pay = await Payments.pay(dateToPay);
    res.status(200).json(pay);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

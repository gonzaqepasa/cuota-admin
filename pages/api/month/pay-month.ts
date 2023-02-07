// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../services/prismaConfig";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    try {
      const { id, addAdmin, mothodPay } = req.body;
      if (!id || !addAdmin || !mothodPay) {
        throw new Error("Faltan argumentos");
      }
      const fecha = new Date();
      console.log(id, addAdmin, mothodPay);
      const addData = `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()} Hs`;
      const month = await prisma.month.update({
        where: {
          id,
        },
        data: {
          isPay: true,
          addData,
          addAdmin,
          mothodPay,
        },
      });

      res.status(200).json(month);
      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      process.exit(1);
    }
  } else {
    res.status(301).json({ msg: "Metodo incorrecto" });
  }
}

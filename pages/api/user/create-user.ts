// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { arrayWithNamesMonths } from "../../../services/infoMonths";
import { prisma } from "../../../services/prismaConfig";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { name, email, phone, description, activityId } = req.body;
      ////////////////////////////////////
      const user = await prisma.user.create({
        data: {
          // Información personal
          name,
          email,
          phone,
          description,
          //Informacion de actividad
          active: true,
          activity: {
            connect: {
              id: activityId,
            },
          },
          //Informacion de pago
          calendar: {
            create: {
              months: {
                create: arrayWithNamesMonths.map((obj) => {
                  return {
                    monthNum: obj.num,
                    monthName: obj.name,
                    addData: "",
                    addAdmin: "",
                    isPay: false,
                    mothodPay: "",
                    pricePay: 0,
                  };
                }),
              },
            },
          },
        },
      });
      ////////////////////////////////////

      res.status(200).json(user);

      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      process.exit(1);
    }
  } else {
    res.status(301).json({ msg: "Metodo inexistente" });
  }
}

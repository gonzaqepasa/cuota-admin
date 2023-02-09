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
      const { id, active } = req.body;
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          active: !active,
        },
      });

      res.status(200).json(user);
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

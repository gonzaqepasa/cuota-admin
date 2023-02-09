// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../services/prismaConfig";

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await prisma.user.findUnique({
        where: {
          id: Number(req.query.USER),
        },
        include: {
          activity: true,
          calendar: {
            include: {
              months: true,
            },
          },
        },
      });
  
    

    res.status(200).json(user);
    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

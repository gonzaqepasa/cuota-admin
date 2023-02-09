// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../services/prismaConfig";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { activity } = req.query;
    console.log(activity);
    let data;
    activity
      ? (data = {
          where: {
            activity: {
              nameActivity: String(activity),
            },
          },
          include: {
            activity: true,
          },
        })
      : (data = undefined);

    const users = await prisma.user.findMany(data);

    res.status(200).json(users);
    await prisma.$disconnect();
  } catch (err) {
    res.status(200).json(err);
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../services/prismaConfig";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { activity } = req.query;

    let data;
    activity
      ? (data = {
          where: {
            nameActivity: String(activity),
          },
        })
      : (data = undefined);

    const activities = await prisma.activity.findMany(data);

    res.status(200).json(activities);
    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

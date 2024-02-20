// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getActivitiesToDashboard } from "../../../services/activity.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
   

    const activities = await getActivitiesToDashboard();

    res.status(200).json(activities);
  } catch (err) {
    console.log(err);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getActivitiesToDashboard,
  getActivityService,
} from "../../../services/activity.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { nameActivity } = req.query;

    const activities = await getActivityService({
      nameActivity: String(nameActivity),
    });

    res.status(200).json(activities);
  } catch (err) {
    console.log(err);
  }
}

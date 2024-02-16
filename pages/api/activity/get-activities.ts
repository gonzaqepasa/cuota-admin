// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getActivity } from "../../../services/activity.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { activity } = req.query;

    const activities = await getActivity({ activity });

    res.status(200).json(activities);
  } catch (err) {
    console.log(err);
  }
}

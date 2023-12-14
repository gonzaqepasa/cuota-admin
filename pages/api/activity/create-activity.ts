// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createActivity,
  getActivity,
} from "../../../server/services/activity.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return `Metodo equivocado`;
  try {
    const { name } = req.body;

    const activities = await createActivity({ name });

    res.status(200).json(activities);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
}

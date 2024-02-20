// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUsersByActivityId } from "../../../services/user.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { activityIds } = req.query;
    const activityIdsArray =
      typeof activityIds === "string"
        ? activityIds.split(",").map((id) => id.trim())
        : [];
    const users = await getUsersByActivityId({ activityIds: activityIdsArray });
    console.log("Array de activity ids", activityIds);

    res.status(200).json(users);
  } catch (err) {
    res.status(300).json({ err: err, msg: "Problema con la base de datos" });
    console.log(err);
  }
}

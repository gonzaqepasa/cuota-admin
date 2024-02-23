// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { arrayWithNamesMonths } from "../../../src/config/infoMonths";
import { createUser } from "../../../services/user.service";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { name, phoneNumber, description, activityId } = req.body;

      const user = await createUser({
        name,
        phoneNumber,
        description,
        activityId,
      });

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(301).json({ msg: "Metodo inexistente" });
  }
}

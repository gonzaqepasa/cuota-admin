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
  async function createActivity() {
    console.log("CREAR ACTIVIDAD");
    try {
      const activityCreate = await prisma.activity.createMany({
        data: [
          { nameActivity: "Gimnasio", modality: "3 Días", price: 3200 },
          { nameActivity: "Gimnasio", modality: "2 Días", price: 3000 },
          { nameActivity: "Gimnasio", modality: "Libre", price: 3500 },
          { nameActivity: "Taekwondo", modality: "Adultos", price: 2300 },
          { nameActivity: "Taekwondo", modality: "Infantiles", price: 2300 },
          { nameActivity: "Taekwondo", modality: "Yamila", price: 2300 },
          { nameActivity: "GAP Funcional", modality: "3 Días", price: 2500 },
          { nameActivity: "Zumba", modality: "3 Días", price: 2500 },
          { nameActivity: "Power Box", modality: "3 Días", price: 2500 },
          { nameActivity: "Kick Boxing", modality: "3 Días", price: 2300 },
          { nameActivity: "Jiu Jitzu", modality: "Unica", price: 2300 },
        ],
      });
      console.log(activityCreate);
      return activityCreate;
    } catch (err) {
      console.log(err);
    }
  }
  const response = await createActivity();
  res.status(200).json(response);
}

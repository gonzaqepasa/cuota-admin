// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  doc,
  query,
  setDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

// type Data = {
//   name: string;
// };
type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const querySnapshot = await getDocs(collection(db, "User"));
    const toSend: object[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().activity.name === "Funcional") {
        const { name, phone, age, email, dni, installments, active, activity } =
          doc.data();

        toSend.push({
          name,
          phone,
          age,
          email,
          dni,
          installments,
          active,
          activity,
          id: doc.id,
        });
      }

      res.status(200).json(toSend);
    });
  } catch (err) {
    res.status(404).send(err);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  doc,
  query,
  setDoc,
  where,
  getDoc,
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
    const docRef = doc(db, "User", String(req.query.id));
    const docSnap = await getDoc(docRef);
    res.status(200).json(docSnap.data());
  } catch (err: any) {
    res.send(err.message);
  }
}

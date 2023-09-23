import { db } from "../firebase/firebaseConfig";
import UserData from "../pages/user/[id]";
import { prisma } from "./prismaConfig";
import { Timestamp, deleteDoc, doc, setDoc } from "firebase/firestore";

interface typesToPay {
  pricePay: number;
  methodPay: string;
  isPay: boolean;
  addData: string;
  addAdmin: string;
  activity: {
    id: number;
    name: string;
    modality: string;
  };
  month: {
    id: number;
    monthNum: number;
    monthName: string;
  };
  user: {
    id: number;

    name: string;
  };
}
export interface typesToCancelPayments {
  userId?: string;
  activityId: number;
  monthId: number;
}

const IDgenerator = (u: number, a: number, m: number): string =>
  `u${u}a${a}m${m}`;

const Payments = {
  pay: async ({
    price,
    mothodPay,
    isPay,
    addAdmin,
    activityId,
    activityModality,
    activityName,
    monthId,
    monthName,
    monthNum,
    userId,

    userName,
  }: any) => {
    ////// Fecha //////
    const fecha = new Date();
    const addData = `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()}`;
    /////////////////////

    const docData: typesToPay = {
      pricePay: Number(price),
      methodPay: String(mothodPay),
      isPay: true,
      addData: String(addData),
      addAdmin: String(addAdmin),
      activity: {
        id: Number(activityId),
        name: String(activityName),
        modality: String(activityModality),
      },
      month: {
        id: Number(monthId),
        monthNum: Number(monthNum),
        monthName: String(monthName),
      },
      user: {
        id: Number(userId),
        name: String(userName),
      },
    };
    try {
      const res = await setDoc(
        doc(db, "Payments", IDgenerator(userId, activityId, monthId)),
        docData
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  },

  CancelPay: async ({ userId, activityId, monthId }: typesToCancelPayments) => {
    try {
      const userDelete = await deleteDoc(
        doc(db, "Payments", IDgenerator(Number(userId), activityId, monthId))
      );
      return userDelete;
    } catch (err) {
      console.log(err);
    }
  },
};

export default Payments;

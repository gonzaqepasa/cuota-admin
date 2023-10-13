import dbConnect from "../mongoose/mongooseConfig";
import paymentsModel from "../mongoose/model/Payments/payments-model";

dbConnect();

interface typesToPay {
  pricePay: number;
  methodPay: string;
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
  userId: string;
  activityId: number;
  monthId: number;
}

const Payments = {
  IDgenerator: (u: number, a: number, m: number): string => `u${u}a${a}m${m}`,

  pay: async ({
    pricePay,
    methodPay,
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
      pricePay: Number(pricePay),
      methodPay: String(methodPay),
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
      const payment = new paymentsModel(docData);
      await payment.save();

      return docData;
    } catch (err) {
      console.log(err);
    }
  },

  CancelPay: async ({ userId, activityId, monthId }: typesToCancelPayments) => {
    try {
      const paymentCancel = await paymentsModel.deleteOne({
        "user.id": userId,
        "activity.id": activityId,
        "month.id": monthId,
      });

      return paymentCancel;
    } catch (err) {
      console.log(err);
    }
  },
};

export default Payments;

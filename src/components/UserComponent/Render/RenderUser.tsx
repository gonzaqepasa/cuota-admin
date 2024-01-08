import { arrayWithNamesMonths } from "../../../config/infoMonths";
import { arrayMonth, monthOfPay } from "../../../config/moths.d";
import { payMonth } from "../../../logic/payMonth";
import {
  typesActivity,
  typesMonth,
  typesPayments,
  typesUser,
} from "../../../types/types-user";
import CardMonth from "./Card/CardMonth";

interface Props {
  user: typesUser;
  activityData: typesActivity;
  getUserAgain: () => void;
  setLoad: any;
}
// {
//   method,
//   trainer,
//   amount,
//   user,
//   description,
//   status,
//   business,
//   activity,
// }

export const RenderUser: React.FC<Props> = ({
  user,
  getUserAgain,
  activityData,
  setLoad,
}) => {
  const paymentsOfActivity = user.payments.filter(
    (p) => String(p.activity) === activityData._id
  );
  console.log("pagos en RenderUser", paymentsOfActivity);
  return (
    <div
      className={`flex flex-col gap-1 min-w-96 w-4/6 backg-card-user rounded p-1 mb-16 `}
    >
      {arrayWithNamesMonths.map((month) => (
        <CardRender
          activityData={activityData}
          setLoad={setLoad}
          user={user}
          getUserAgain={getUserAgain}
          key={month.num}
          paymentsOfActivity={paymentsOfActivity}
          m={month}
        />
      ))}
    </div>
  );
  ///////////////////////////////////////////////////////////////////////
};

const CardRender = ({
  paymentsOfActivity,
  m,
  activityData,
  getUserAgain,
  user,
  setLoad,
}: {
  paymentsOfActivity: typesPayments[];
  activityData: typesActivity;
  getUserAgain: () => void;
  setLoad: any;
  user: typesUser;
  m: {
    num: number;
    name: string;
  };
}) => {
  const PaymentTest: typesPayments | undefined = paymentsOfActivity.find(
    (p) => {
      const monthArray = p.paymentDateTime.split("/");
      const month = monthArray[1];
      // console.log(arrayWithNamesMonths[Number(month)-1].name);
      return month && arrayWithNamesMonths[Number(month)].name === m.name;
    }
  );
  console.log(m.name, PaymentTest);
  return (
    <div className=" p-2  bg-white/20">
      <p>{m.name}</p>

      {PaymentTest?.user ? (
        <div>Este mes esta pago</div>
      ) : (
        <button
          onClick={() =>
            payMonth({
              activity: activityData,
              getUserAgain,
              user,
              setIsLoad: setLoad,
            })
          }
        >
          Pay
        </button>
      )}
    </div>
  );
};

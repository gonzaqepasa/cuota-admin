import { AiFillLike } from "react-icons/ai";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { typesActivity, typesUser } from "../../../../types/types-user";
import CountdownTimer from "./CountdownTimer";
import {
  displayTimeRemaining,
  getTimeRemaining,
  isUserWithinPaymentMonth,
} from "./logicPayment";
import {
  calculateExpirationDate,
  getByLastPay,
} from "../../../Payments/BtnAddPay/logicPayments";
import { formatDateTime } from "../../../../logic/dateFormated";

interface Props {
  user: typesUser;
  activities: typesActivity[];
}
const PaymentCol: React.FC<Props> = ({ user, activities }) => {
  const lastPayment = getByLastPay(user);
  if (!lastPayment)
    return (
      <div>
        <p className="text-content1-300">{"Sin pagos"}</p>
      </div>
    );

  if (isUserWithinPaymentMonth(lastPayment.createdAt)) {
    const activity = activities.find(
      (a) => a._id === String(lastPayment.activity)
    );

    return (
      <div className={`w-max flex items-center   gap-1    `}>
        <p
          style={{ background: activity?.color }}
          className=" p-1 rounded-full "
        >
          <AiFillLike className="text-content1-100 shadow " />
        </p>

        <p className="text-content1-100 text-base  font-medium px-1 rounded">
          {firstLetterUpper(activity?.nameActivity || "")}
        </p>
        <p style={{ color: activity?.color }}>
          {firstLetterUpper(activity?.modality || "")}
        </p>

        <CountdownTimer
          paymentDate={new Date(lastPayment.createdAt)}
          expirationDate={
            lastPayment.expirationDate
              ? new Date(lastPayment.expirationDate)
              : calculateExpirationDate(new Date(lastPayment.createdAt), 1)
          }
        />
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center gap-2">
        <p className=" p-1 rounded-full bg-gray-500">
          <AiFillLike className="text-content1-100 shadow rotate-180 " />
        </p>
        <p className="text-content1-100">vencio</p>
        {lastPayment.expirationDate && (
          <p className="text-content1-400">
            {formatDateTime(new Date(lastPayment.expirationDate))}
          </p>
        )}
      </div>
    </>
  );
};

export default PaymentCol;

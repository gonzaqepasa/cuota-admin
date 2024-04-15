import { AiFillLike } from "react-icons/ai";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { typesActivity, typesUser } from "../../../../types/types-user";
import CountdownTimer from "./CountdownTimer";
import {
  displayTimeRemaining,
  getTimeRemaining,
  isUserWithinPaymentMonth,
} from "./logicPayment";

interface Props {
  user: typesUser;
  activities: typesActivity[];
}
const PaymentCol: React.FC<Props> = ({ user, activities }) => {
  // Ordenar los meses por fecha de creación en orden descendente
  const sortedMonths = user.months.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Tomar el primer elemento, que será el último pago
  const lastPayment = sortedMonths[0];

  if (!lastPayment)
    return (
      <div>
        <p className="text-content1-400">{"Sin pagos"}</p>
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
          className=" p-1 rounded-full"
        >
          <AiFillLike className="text-content1-100 shadow " />
        </p>

        <p className="text-content1-100 text-base shadow font-medium px-1 rounded">
          {firstLetterUpper(activity?.nameActivity || "")}
        </p>
        <p style={{ color: activity?.color }}>
          {firstLetterUpper(activity?.modality || "")}
        </p>

        <CountdownTimer paymentDate={new Date(lastPayment.createdAt)} />
      </div>
    );
  }
  return (
    <>
      <div>
        <p className=" p-1 rounded-full bg-gray-500">
          <AiFillLike className="text-content1-100 shadow " />
        </p>
        <p>{lastPayment.monthName}</p>
        <p>{lastPayment.createdAt}</p>
      </div>
    </>
  );
};

export default PaymentCol;

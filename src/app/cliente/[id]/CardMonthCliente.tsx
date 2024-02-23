import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { typesMonth } from "../../../types/types-user";
interface Props {
  month: typesMonth | undefined;
  m: {
    name: string;
    num: number;
  };
}
const CardMonthCliente: React.FC<Props> = ({ month, m }) => {
  return (
    <>
      <div
        className={`  p-2 rounded-md min-h-full ${
          month?.isPay ? "bg-green-200" : "bg-neutral-700/60"
        }`}
      >
        <div>
          <p
            className={`text-neutral-200 font-semibold ${
              month?.isPay && "text-neutral-900"
            } text-center`}
          >
            {m.name}
          </p>
        </div>
        <div
          className={` h-20 flex items-center justify-center ${
            month?.isPay ? "" : ""
          }`}
        >
          {month?.isPay ? (
            <p className="text-3xl text-green-600">
              <IoMdCheckmarkCircleOutline />
            </p>
          ) : (
            <p className="text-red-600">
              <ImCancelCircle />
            </p>
          )}
        </div>
        {month?.isPay && (
          <div className="flex justify-center">
            <p className=" italic text-neutral-700">
              {new Date(String(month.paymentDate)).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CardMonthCliente;

import { typesMonth, typesUser } from "../../../types/types-user";

import { FcCheckmark } from "react-icons/fc";
import { FaMoneyBillWave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import Image from "next/image";
import mp from "../../../../styles/mp.png";
import { numberToMoney } from "../../../logic/numberToMoney";
import { ButtonPay } from "./btn/Pay/Pay";
import { ButtonCancel } from "./btn/Cancel/Cancel";
import { mesActual } from "../../Deptor/logic/moths.d";

interface Props {
  monthData: typesMonth[];
  user: any;
  userData: typesUser;
  getUserAgain: () => void;
}

export const RenderUser: React.FC<Props> = ({
  user,
  monthData,
  userData,
  getUserAgain,
}) => {
  const currentMonth = (monthName: string) => mesActual() === monthName;
  return (
    <div className={` min-w-96 w-4/6 backg-card-user rounded p-1 mb-16 `}>
      {monthData.map((el, index) => (
        <div
          className={`relative h-32 flex flex-col justify-around   px-1 py-3 ${
            currentMonth(el.monthName)
              ? "border-2  border-cyan-600"
              : "border-b-2  border-neutral-700"
          } ${(index - 1) % 2 && "bg-cyan-900 bg-opacity-20"}  `}
          key={index}
        >
          {/* Nombre de mes  */}
          <div className={"flex items-center"}>
            <p className={`text-neutral-200 text-sm `}>Mes :</p>
            <p className="flex text-cyan-500  text-sm items-center mx-1">
              {el.monthName}
              {el.isPay && <FcCheckmark className="mx-1" />}
            </p>
          </div>
          {/* Estado del pago  */}
          <div className={" flex items-center "}>
            <p className={`text-neutral-200 text-sm`}>Estado :</p>
            {el.isPay ? (
              <>
                <p className={`text-neutral-400 text-sm font-light mx-1`}>
                  {`Pago `}
                  <i className="col-green-succes text-sm">
                    {numberToMoney(el.pricePay)}
                  </i>
                </p>
                {el.mothodPay === "MP" ? (
                  <Image
                    src={mp}
                    height={22}
                    className="mx-1 "
                    alt="no se encontr imagen"
                  />
                ) : (
                  <FaMoneyBillWave
                    className="mx-1 col-green-succes "
                    size={20}
                  />
                )}
                <ButtonCancel el={el} getUserAgain={getUserAgain} />
              </>
            ) : (
              <>
                <p className={`mx-1 text-neutral-500  font-light text-sm`}>
                  No pago
                </p>
                <FcCancel size={15} />

                <ButtonPay
                  el={el}
                  userData={user}
                  getUserAgain={getUserAgain}
                />
              </>
            )}
          </div>
          {/* Email de que tomo el pago */}
          <div className={`flex items-center`}>
            <p className={`text-neutral-200 text-sm`}>Recibió :</p>
            <p className="mx-1 text-neutral-400 text-sm">
              {el.isPay ? el.addAdmin : "-"}
            </p>
          </div>
          {/* Fecha de cobro */}
          <div className={`flex items-center`}>
            <p className={`text-neutral-200 text-sm`}>Fecha de cobro :</p>
            <p className={` mx-1 text-neutral-300 font-light text-sm`}>
              {el.isPay ? el.addData : "-"}
            </p>
          </div>
        </div>
        /////////// -> end card
      ))}
    </div>
  );
  ///////////////////////////////////////////////////////////////////////
};

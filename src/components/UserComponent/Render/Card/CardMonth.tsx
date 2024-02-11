"use client";
import { typesMonth, typesUser } from "../../../../types/types-user";
import { FcCheckmark } from "react-icons/fc";
import { FaMoneyBillWave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { numberToMoney } from "../../../../logic/numberToMoney";
import Image from "next/image";
import mp from "../../../../styles/mp.png";
import { ButtonCancel } from "../btn/Cancel/Cancel";
import { ButtonPay } from "../btn/Pay/Pay";
import { useState } from "react";
import { mesActual } from "../../../../config/moths.d";
import { selectColor } from "../../../../logic/selectColor";

interface Props {
  el: typesMonth;
  index: number;
  user: typesUser;
}

const CardMonth: React.FC<Props> = ({ el, index, user }) => {
  const [isLoad, setIsLoad] = useState(false);
  return (
    <div
      id={el.monthName}
      className={` relative flex flex-col my-0 pl-2 text-neutral-800 lg:pb-5 pb-12  `}
      key={index}
    >
      {/* Nombre de mes  */}
      <div className={"flex items-center"}>
        <p className={`text-sm font-bold text-neutral-500`}>Mes :</p>
        <p
          className="flex   text-sm items-center mx-1 font-semibold    text-neutral-900"
          style={{ color: selectColor(user.activity.nameActivity) }}
        >
          {el.monthName}
          {el.isPay && <FcCheckmark className="mx-1" />}
        </p>
      </div>
      {/* Estado del pago  */}
      <div className={" flex items-center "}>
        <p className={`text-sm font-bold text-neutral-500`}>Estado :</p>
        {el.isPay ? (
          <>
            <p className={`  mx-1 font-medium  text-sm text-neutral-900`}>
              {`Pago `}
              <i className="col-green-succes  ">{numberToMoney(el.pricePay)}</i>
            </p>
            {el.mothodPay === "MP" ? (
              <Image
                src={mp}
                height={20}
                className="mx-1 "
                alt="no se encontr imagen"
              />
            ) : (
              <FaMoneyBillWave className="mx-1 text-success-600 " size={20} />
            )}
            <ButtonCancel el={el} />
          </>
        ) : (
          <>
            <p className={`mx-1  font-medium text-sm`}>No pago</p>
            <FcCancel size={15} />

            <ButtonPay el={el} userData={user} />
          </>
        )}
      </div>
      {/* Email de que tomo el pago */}
      <div className={`flex items-center`}>
        <p className={` text-sm font-bold text-neutral-500`}>Recibió :</p>
        <p className="mx-1 text-sm font-medium text-neutral-900">
          {el.isPay ? el.addAdmin : "-"}
        </p>
      </div>
      {/* Fecha de cobro */}
      <div className={`flex items-center`}>
        <p className={` text-sm text-neutral-500 font-bold`}>
          Fecha de cobro :
        </p>
        <p className={` mx-1 font-medium  text-sm text-neutral-900`}>
          {el.isPay ? el.addData : "-"}
        </p>
      </div>
    </div>
  );
};

export default CardMonth;

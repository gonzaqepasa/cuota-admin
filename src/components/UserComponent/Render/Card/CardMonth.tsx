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
      className={`relative flex flex-col my-0 justify-around    `}
      key={index}
    >
      <div className=" animate-one p-1 h-32">
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
                <FaMoneyBillWave className="mx-1 col-green-succes " size={20} />
              )}
              {/* <ButtonCancel el={el} setIsLoad={setIsLoad} /> */}
            </>
          ) : (
            <>
              <p className={`mx-1 text-neutral-500  font-light text-sm`}>
                No pago
              </p>
              <FcCancel size={15} />

              {/* <ButtonPay el={el} userData={user} setIsLoad={setIsLoad} /> */}
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
    </div>
  );
};

export default CardMonth;

"use client";
import { AiFillLike } from "react-icons/ai";
import CountdownTimer from "../Dashboard/UsersRender/Table/CountdownTimer";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesMonth } from "../../types/types-user";
import { isUserWithinPaymentMonth } from "../Dashboard/UsersRender/Table/logicPayment";
import Logo from "../../styles/images/fevicon.png";

import Image from "next/image";
import { calculateExpirationDate } from "../Payments/BtnAddPay/logicPayments";
import { formatDateTime } from "../../logic/dateFormated";

interface Props {
  lastPayment: typesMonth;
}
const LastPaymentComponent: React.FC<Props> = ({ lastPayment }) => {
  return (
    <>
      {isUserWithinPaymentMonth(lastPayment.createdAt) ? (
        <>
          <div
            style={{ borderColor: lastPayment.activity.color }}
            className="  w-full  max-w-3xl border-l-3 grid grid-cols-2 items-center text-neutral-200 green-gradient bg-primary-200 p-2 py-6   "
          >
            <div className="flex flex-col items-start ">
              {/* ////// datos ////// */}
              <p className="text-content1-200 ">{`ULTIMO PAGO:`}</p>
              <div>
                <p className="text-content1-400 text-sm">Pago:</p>
                <p>{formatDateTime(new Date(lastPayment.createdAt))}</p>
              </div>
              {lastPayment.expirationDate && (
                <div>
                  <p className="text-content1-400 text-sm">Vencimiento:</p>
                  <p>{formatDateTime(new Date(lastPayment.expirationDate))}</p>
                </div>
              )}
            </div>
            <div className="flex  justify-start items-center gap-2 ">
              {/* ////// LASTPAYMENT ////// */}
              <div className="flex flex-col items-center">
                <p className=" text-3xl">
                  {firstLetterUpper(lastPayment.activity.nameActivity)}
                </p>
              </div>
              <AiFillLike size={40} color="green" className="drop-shadow" />
            </div>
          </div>
          {/* //////// COMPONENTE FLOTANTE //////// */}
          <div
            style={{ borderColor: lastPayment.activity.color }}
            className={`w-screen max-w-3xl rounded-b-xl rounde-xl shadow-xl flex border-l-3 items-center justify-between px-2 sticky top-0 z-30 bg-primary-100 `}
          >
            <div>
              <div className="flex gap-1 px-2 items-center">
                {/* <span
                  className="h-2 w-2 rounded-full "
                  style={{ background: lastPayment.activity.color }}
                ></span> */}
                <p className="text-white text-sm">
                  {firstLetterUpper(lastPayment.activity.nameActivity)}
                </p>
              </div>
            </div>
            <CountdownTimer
              paymentDate={new Date(lastPayment.createdAt)}
              // bg={true}
              size={1.4}
              expirationDate={
                lastPayment.expirationDate
                  ? new Date(lastPayment.expirationDate)
                  : calculateExpirationDate(new Date(lastPayment.createdAt), 1)
              }
            />
            <div></div>
          </div>
          {/* ////////  //////// */}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default LastPaymentComponent;

"use client";
import { AiFillLike } from "react-icons/ai";
import CountdownTimer from "../Dashboard/UsersRender/Table/CountdownTimer";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesMonth } from "../../types/types-user";
import { isUserWithinPaymentMonth } from "../Dashboard/UsersRender/Table/logicPayment";
import LogoText from "../../styles/images/logo.png";
import Logo from "../../styles/images/fevicon.png";

import Image from "next/image";
import { calculateExpirationDate } from "../Payments/BtnAddPay/logicPayments";

interface Props {
  lastPayment: typesMonth;
}
const LastPaymentComponent: React.FC<Props> = ({ lastPayment }) => {
  return (
    <>
      {isUserWithinPaymentMonth(lastPayment.createdAt) && (
        <div className="  w-full  grid grid-cols-2 items-center text-neutral-200 bg-primary-300 p-2 shadow-inner shadow-success-100 ">
          <div className="flex flex-col items-center">
            {/* ////// LOGO ////// */}
            <Image src={Logo} alt="" width={60} height={60} />
            <Image
              className="drop-shadow "
              src={LogoText}
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col items-center  gap-2 ">
            {/* ////// LASTPAYMENT ////// */}
            <div className="flex flex-col items-center">
              <p className="">
                {firstLetterUpper(lastPayment.activity.nameActivity)}
              </p>
            </div>
            <AiFillLike size={40} color="green" className="drop-shadow" />
            <CountdownTimer
              paymentDate={new Date(lastPayment.createdAt)}
              bg={true}
              expirationDate={
                lastPayment.expirationDate
                  ? new Date(lastPayment.expirationDate)
                  : calculateExpirationDate(new Date(lastPayment.createdAt), 1)
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LastPaymentComponent;

import { typesMonth, typesUser } from "../../../types/types-user";

import { orderByMonth } from "../../../logic/orderByMonthName";
import Image from "next/image";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import { arrayWithNamesMonths } from "../../../config/infoMonths";
import getUser from "../../../api-next/user/getUser";
import CardMonthCliente from "./CardMonthCliente";
import LogoText from "../../../styles/images/logo.png";
import Logo from "../../../styles/images/fevicon.png";
import { getPaymentsClient } from "../../../api-next/month/getMonths";
import {
  calculateExpirationDate,
  getByLastPay,
  getLastPayFromArrayMonths,
} from "../../../components/Payments/BtnAddPay/logicPayments";
import CountdownTimer from "../../../components/Dashboard/UsersRender/Table/CountdownTimer";
import { CiWarning } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { isUserWithinPaymentMonth } from "../../../components/Dashboard/UsersRender/Table/logicPayment";

interface Params {
  params: { id: string };
}
export default async function List({ params }: Params) {
  const user: typesUser = await getUser({ id: params.id });
  const payments: typesMonth[] = await getPaymentsClient({ id: params.id });

  // const lastPayment = getByLastPay(data);

  const lastPayment = getLastPayFromArrayMonths(payments);
  return (
    <>
      <main className=" flex   flex-col items-center min-h-screen bg-image-center">
        {isUserWithinPaymentMonth(lastPayment.createdAt) && (
          <div className="  w-full  grid grid-cols-2 items-center bg-green-900 p-2 ">
            <div className="flex flex-col items-center">
              {/* ////// LOGO ////// */}
              <Image src={Logo} alt="" width={60} height={60} />
              <Image
                className="drop-shadow"
                src={LogoText}
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              {/* ////// LASTPAYMENT ////// */}
              <p>{firstLetterUpper(lastPayment.activity.nameActivity)}</p>
              <p>{firstLetterUpper(lastPayment.activity.modality)}</p>
              <AiFillLike size={40} color="green" className="drop-shadow" />
              <CountdownTimer
                paymentDate={new Date(lastPayment.createdAt)}
                bg={true}
                expirationDate={
                  lastPayment.expirationDate
                    ? new Date(lastPayment.expirationDate)
                    : calculateExpirationDate(
                        new Date(lastPayment.createdAt),
                        1
                      )
                }
              />
            </div>
          </div>
        )}
        <div className="flex flex-col items-center">
          <div>
            <p className="text-2xl text-neutral-100">
              {firstLetterUpper(user.name)}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

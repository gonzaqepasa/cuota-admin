import { typesMonth } from "../../../types/types-user";

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
} from "../../../components/Payments/BtnAddPay/logicPayments";
import CountdownTimer from "../../../components/Dashboard/UsersRender/Table/CountdownTimer";
import { CiWarning } from "react-icons/ci";

interface Params {
  params: { id: string };
}
export default async function List({ params }: Params) {
  const data = await getUser({ id: params.id });
  // const payments = await getPaymentsClient({ id: params.id });

  // const lastPayment = getByLastPay(data);
  console.log("aca esta la data del client", data);
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <CiWarning className="text-6xl text-yellow-400 drop-shadow-md" />
      <p>Actualizando...</p>
      <p className="text-neutral-500">Vuelva más tarde.</p>
    </div>
  );
  // return (
  //   <>
  //     <div className=" flex  flex-col items-center min-h-screen ">
  //       <div className=" flex w-full flex-col items-center bg-image-center">
  //         <div>
  //           <Image src={Logo} alt="" width={100} height={100} />
  //           <Image
  //             className="drop-shadow"
  //             src={LogoText}
  //             alt=""
  //             width={150}
  //             height={150}
  //           />
  //         </div>
  //         <div>
  //           {/* ////// LASTPAYMENT ////// */}
  //           <CountdownTimer
  //             paymentDate={new Date(lastPayment.createdAt)}
  //             expirationDate={
  //               lastPayment.expirationDate
  //                 ? new Date(lastPayment.expirationDate)
  //                 : calculateExpirationDate(new Date(lastPayment.createdAt), 1)
  //             }
  //           />
  //         </div>
  //       </div>
  //       <div className="flex flex-col items-center">
  //         <div>
  //           <p className="text-2xl text-neutral-100">
  //             {firstLetterUpper(data.name)}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}

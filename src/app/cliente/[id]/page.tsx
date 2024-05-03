import { typesMonth, typesUser } from "../../../types/types-user";
import "../../../styles/animista/trackingin.css";
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
import { Card, Divider } from "@nextui-org/react";

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
      <main className=" flex dark  flex-col items-center min-h-screen bg-image-center">
        <div className="flex flex-col  bg-black w-full p-2">
          <p className="text-2xl text-neutral-300 ">
            {firstLetterUpper(user.name)}
          </p>
        </div>

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
                <p className="tracking-in-contract-bck">
                  {firstLetterUpper(lastPayment.activity.nameActivity)}
                </p>
                <p style={{ color: lastPayment.activity.color }}>
                  {firstLetterUpper(lastPayment.activity.modality)}
                </p>
              </div>
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

        {/* ////// TERCER COMPONENTE ////// */}
        <div className="bg-neutral-900/80 flex flex-col items-center min-h-screen w-screen">
          <ol className="flex flex-col  gap-1">
            {payments.map((p) => (
              <>
                {p.activity && (
                  <Card
                    key={p._id}
                    className="min-w-[400px] p-1 bg-opacity-80"
                    shadow="md"
                  >
                    <div className="flex gap-2 items-center">
                      <p
                        className="h-4 w-4 rounded-full "
                        style={{ backgroundColor: p.activity?.color }}
                      ></p>
                      <p>{firstLetterUpper(p.activity?.nameActivity)}</p>
                      <p style={{ color: p.activity.color }}>
                        {firstLetterUpper(p.activity?.modality)}
                      </p>
                    </div>
                    <Divider />
                    <div>
                      <CountdownTimer
                        paymentDate={new Date(p.createdAt)}
                        // bg={true}
                        expirationDate={
                          p.expirationDate
                            ? new Date(p.expirationDate)
                            : calculateExpirationDate(new Date(p.createdAt), 1)
                        }
                      />
                    </div>
                  </Card>
                )}
              </>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}

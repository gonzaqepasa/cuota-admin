import { typesMonth, typesUser } from "../../../types/types-user";
import "../../../styles/animista/trackingin.css";
import "animate.css";
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
import LastPaymentComponent from "../../../components/Cliente/LastPayment";
import NameUserComponent from "../../../components/Cliente/NameUserCliente";
import RenderPaymentsComponent from "../../../components/Cliente/RenderPayments";
import Carousel1 from "../../../components/Globals/Carousel/Carousel1";
import SocialIcons from "../../../components/Cliente/SocialIcons";

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
      <main className=" flex dark   flex-col items-center min-h-screen bg-primary-200 ">
        <NameUserComponent user={user} />
        <div className={`w-screen sticky top-0 z-30`}>
          <LastPaymentComponent lastPayment={lastPayment} />
        </div>
        <SocialIcons />

        <RenderPaymentsComponent payments={payments} />
        <Carousel1 />
      </main>
    </>
  );
}

import { typesMonth, typesUser } from "../../../types/types-user";
import "../../../styles/animista/trackingin.css";
import "animate.css";
import getUser from "../../../api-next/user/getUser";
import { getPaymentsClient } from "../../../api-next/month/getMonths";
import { getLastPayFromArrayMonths } from "../../../components/Payments/BtnAddPay/logicPayments";
import LastPaymentComponent from "../../../components/Cliente/LastPayment";
import NameUserComponent from "../../../components/Cliente/NameUserCliente";
import RenderPaymentsComponent from "../../../components/Cliente/RenderPayments";
import PhotosComponent from "../../../components/Globals/Carousel/PhotosComponent";
import SocialIcons from "../../../components/Cliente/SocialIcons";
import Carousel2 from "../../../components/Globals/Carousel/Carousel2";

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
      <main className=" flex dark relative  flex-col items-center min-h-screen bg-primary-200 ">
        <NameUserComponent user={user} />

        <Carousel2 />
        <LastPaymentComponent lastPayment={lastPayment} />

        <RenderPaymentsComponent payments={payments} />
        <SocialIcons />
        {/* <PhotosComponent /> */}
      </main>
    </>
  );
}

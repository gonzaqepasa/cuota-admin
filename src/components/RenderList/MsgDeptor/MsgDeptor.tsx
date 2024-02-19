import Image from "next/image";
import { typesUser } from "../../../types/types-user";
import { mesActual } from "../../../config/moths";
import { FaMoneyBillWave } from "react-icons/fa";
import mp from "../../../styles/mp.png";
import { FcCancel } from "react-icons/fc";

interface Props {
  user: typesUser;
  month: string;
}
export const MsgDeptor: React.FC<Props> = ({ user, month }) => {
  const aux = user.months?.find((m) => {
    return m.monthName === month;
  });
  // console.log(aux, "asdasdasdasdasdasd");

  if (aux?.isPay === false) {
    return <FcCancel className={` text-2xl `} />;
  } else if (aux?.mothodPay === "MP") {
    return (
      <Image src={mp} height={24} className=" " alt="no se encontr imagen" />
    );
  } else {
    return <FaMoneyBillWave className={` text-2xl `} color="green" />;
  }
};

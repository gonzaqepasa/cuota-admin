import Image from "next/image";
import { typesMonth, typesUser } from "../../../types/types-user";
import { mesActual } from "../../../config/moths.d";
import { FaMoneyBillWave } from "react-icons/fa";
import mp from "../../../styles/mp.png";
import { FcCancel } from "react-icons/fc";

interface Props {
  user: typesUser;
  monthName:string
}
export const MsgDeptor: React.FC<Props> = ({ user ,monthName}) => {
  const month = user.months?.find((m) => {
    return m.monthName === monthName.toLowerCase();
  });

  if (month?.method === "MP")
    return (
      <Image src={mp} height={24} className=" " alt="no se encontr imagen" />
    );

  if (month?.method === "EF")
    return <FaMoneyBillWave className={` text-2xl `} color="green" />;
  return <FcCancel className={` text-2xl `} />;
};

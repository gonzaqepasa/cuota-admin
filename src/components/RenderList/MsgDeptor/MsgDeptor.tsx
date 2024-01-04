import Image from "next/image";
import { typesUser } from "../../../types/types-user";
import { mesActual } from "../../Deptor/logic/moths.d";
import { FaMoneyBillWave } from "react-icons/fa";
import mp from "../../../../styles/mp.png";

interface Props {
  user: typesUser;
  month: string;
}
export const MsgDeptor: React.FC<Props> = ({ user, month }) => {
 
  // console.log(aux, "asdasdasdasdasdasd");

  // if (aux?.isPay === false) {
  //   return (
  //     <p
  //       className={`flex items-center justify-center text-xs font-semibold text-neutral-900 px-2 mx-1 rounded-lg bg-neutral-400`}
  //     >
  //       n-p
  //     </p>
  //   );
  // } else if (aux?.mothodPay === "MP") {
    return (
      <Image
        src={mp}
        height={22}
        className="mx-1 "
        alt="no se encontr imagen"
      />
    );
  // } else {
  //   return <FaMoneyBillWave className="mx-1" color="green" size={18} />;
  // }
};

import { payMonth } from "../../../../../logic/payMonth";
import { selectColor } from "../../../../../logic/selectColor";
import { MdAdd } from "react-icons/md";
import { auth } from "../../../../../../firebase/firebaseConfig";

interface Props {
  el: any;
  userData: any;
  getUserAgain: () => void;
}

export const ButtonPay: React.FC<Props> = ({ el, userData, getUserAgain }) => {
  return (
    <button
      // style={{
      //   color: ` ${selectColor(userData.activity.nameActivity)}`,
      // }}
      onClick={(e) => {
        payMonth({
          e,
          id: el.id,
          userName: userData.name,
          monthName: el.monthName,
          addAdmin: auth.currentUser?.email,
          getUserAgain,
          pricePay: userData.activity.price,
          activityId: userData.activity.id,
        });
      }}
      className={`absolute bg-neutral-700 hover:bg-neutral-600 shadow  shadow-neutral-900 text-cyan-600 hover:text-cyan-500 transition-colors  right-2 bottom-2 flex items-center px-3 py-1 rounded font-light `}
    >
      <MdAdd color="white" />
      Pagar mes
    </button>
  );
};

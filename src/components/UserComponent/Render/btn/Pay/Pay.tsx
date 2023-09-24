import { payMonth } from "../../../../../logic/payMonth";
import { MdAdd } from "react-icons/md";

interface Props {
  el: any;
  userData: any;
  getUserAgain: () => void;
}

export const ButtonPay: React.FC<Props> = ({ el, userData, getUserAgain }) => {
  console.log("esto es userData en boton", userData);
  return (
    <button
      onClick={(e) => {
        payMonth({ month: el, userData, getUserAgain });
      }}
      className={`absolute bg-neutral-800 hover:bg-green-900 shadow  shadow-neutral-900 text-neutral-300 hover:text-neutral-200 transition-colors text-sm  right-2 bottom-2 flex items-center px-3 py-1 rounded font-light `}
    >
      <MdAdd className="text-xl text-green-400" />
      Pagar mes
    </button>
  );
};

import { payMonth } from "../../../../../logic/payMonth";
import { MdAdd } from "react-icons/md";


interface Props {
  el: any;
  userData: any;
  getUserAgain: () => void;
}

export const ButtonPay: React.FC<Props> = ({ el, userData, getUserAgain }) => {
  console.log('esto es userData en boton', userData)
  return (
    <button
    
      onClick={(e) => {
        payMonth({ month: el, userData, getUserAgain });
      }}
      className={`absolute bg-neutral-700 hover:bg-neutral-600 shadow  shadow-neutral-900 text-cyan-600 hover:text-cyan-500 transition-colors  right-2 bottom-2 flex items-center px-3 py-1 rounded font-light `}
    >
      <MdAdd color="white" />
      Pagar mes
    </button>
  );
};

import { payCancel } from "../../../../../logic/payCancel";
import { type typesMonth } from "../../../../../types/types-user";
import { FcCancel } from "react-icons/fc";

interface Props {
  el: typesMonth;
  getUserAgain: () => void;
}

export const ButtonCancel: React.FC<Props> = ({ el, getUserAgain }) => {
  function handleCancel() {
    console.log("Cancel");
    payCancel({ id: el.id, getUserAgain, monthName: el.monthName });
  }

  return (
    <button
      onClick={() => handleCancel()}
      className={`absolute right-1 bottom-1 flex items-center text-neutral-500 transition-colors hover:text-neutral-400 text-xs`}
    >
      Cancelar Pago
      <FcCancel className="mx-1" size={12} />
    </button>
  );
};

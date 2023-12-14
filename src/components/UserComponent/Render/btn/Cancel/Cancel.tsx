import { typesToCancelPayments } from "../../../../../../server/services/payments.service";
import { payCancel } from "../../../../../logic/payCancel";
import { type typesMonth } from "../../../../../types/types-user";
import { FcCancel } from "react-icons/fc";
import { Dispatch, SetStateAction } from "react";

interface Props {
  el: typesMonth;
  getUserAgain: () => void;
  idToCancelPayments: typesToCancelPayments;
  setIsLoad: Dispatch<SetStateAction<boolean>>;
}

export const ButtonCancel: React.FC<Props> = ({
  el,
  getUserAgain,
  idToCancelPayments,
  setIsLoad,
}) => {

  return (
    <button
      onClick={() =>
        payCancel({
          id: el.id,
          getUserAgain,
          monthName: el.monthName,
          idToCancelPayments,
          setIsLoad,
        })
      }
      className={`absolute right-1 bottom-1 flex items-center text-neutral-500 transition-colors hover:text-neutral-400 text-xs`}
    >
      Cancelar Pago
      <FcCancel className="mx-1" size={12} />
    </button>
  );
};

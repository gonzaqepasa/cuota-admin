import { payCancel } from "../../../../../logic/payCancel";
import { type typesMonth } from "../../../../../types/types-user";
import styles from "./Cancel.module.scss";
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
    <button onClick={() => handleCancel()} className={`${styles.cancelPay}`}>
      Cancelar Pago
      <FcCancel size={14} />
    </button>
  );
};

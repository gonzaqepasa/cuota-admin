import { payMonth } from "../../../../../logic/payMonth";
import { selectColor } from "../../../../../logic/selectColor";
import { MdAdd } from "react-icons/md";
import { auth } from "../../../../../../firebase/firebaseConfig";
import styles from "./Pay.module.scss";

interface Props {
  el: any;
  userData: any;
  getUserAgain: () => void;
}

export const ButtonPay: React.FC<Props> = ({ el, userData,getUserAgain }) => {
  return (
    <button
      style={{
        borderBottom: `solid 1px ${selectColor(
          userData.activity.nameActivity
        )}`,
      }}
      onClick={(e) => {
        payMonth(
          e,
          el.id,
          userData.name,
          el.monthName,
          auth.currentUser?.email,
          userData.activity.price,
          getUserAgain
        );
      }}
      className={styles.btnPay}
    >
      <MdAdd color={selectColor(userData.activity.nameActivity)} />
      PAGAR MES
    </button>
  );
};

import styles from "./ButtonAdd.module.scss";
import { Dispatch, SetStateAction } from "react";
import { MdAdd } from "react-icons/md";
import { selectColor } from "../../../logic/selectColor";

interface Props {
  setModalAdd: Dispatch<SetStateAction<any>>;
  color: string;
  modalAdd: boolean;
}

export const ButtonAdd: React.FC<Props> = ({
  setModalAdd,
  color,
  modalAdd,
}) => {
  return (
    <div className={`${styles.allButtonAdd} ${modalAdd && styles.modalOn}`}>
      {
        <button
          className={`${styles.btn} `}
          onClick={(e) => setModalAdd((state: boolean) => !state)}
        >
          <p className={`${modalAdd && styles.paraOn}`}>Agregar usuario</p>
          <span className={`${modalAdd && styles.spanOn}`}>
            <MdAdd size={35} color={selectColor(color)} />
          </span>
        </button>
      }
    </div>
  );
};

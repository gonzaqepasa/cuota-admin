import styles from "./ButtonAdd.module.scss";
import { Dispatch, SetStateAction } from "react";
import { MdPersonAdd } from "react-icons/md";
import { selectColor } from "../../../logic/selectColor";
export default function ButtonAdd({
  setModalAdd,
  color,
}: {
  setModalAdd: Dispatch<SetStateAction<any>>;
  color: string;
}) {
  return (
    <div className={`${styles.allButtonAdd}`}>
      {
        <button onClick={(e) => setModalAdd((state: boolean) => !state)}>
          <MdPersonAdd color={selectColor(color)} />
        </button>
      }
    </div>
  );
}

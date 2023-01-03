import styles from "./ButtonAdd.module.scss";
import { Dispatch, SetStateAction } from "react";
import { MdPersonAdd } from "react-icons/md";
export default function ButtonAdd({
  setModalAdd,
}: {
  setModalAdd: Dispatch<SetStateAction<any>>;
}) {
  return (
    <div className={`${styles.allButtonAdd}`}>
      {
        <button onClick={(e) => setModalAdd((state: boolean) => !state)}>
          <MdPersonAdd />
        </button>
      }
    </div>
  );
}

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
    <div className={` w-3/4 flex justify-end `}>
      {
        <button
          className={`flex text-sm `}
          onClick={(e) => setModalAdd((state: boolean) => !state)}
        >
          <p className={`text-neutral-400 hover:text-neutral-300 ${!modalAdd ? "flex" : "hidden"}`}>
            Agregar usuario
          </p>
          <span className={`transition rotate-180 ${modalAdd && "rotate-45"} opacity-80 hover:opacity-100`}>
            <MdAdd size={25} color={selectColor(color)} />
          </span>
        </button>
      }
    </div>
  );
};

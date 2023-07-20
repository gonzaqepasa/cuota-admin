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
    <div className={` w-full flex items-center justify-end py-2  `}>
      {
        <button
          className={`flex items-center justify-center px-2 transition rounded text-white  ${
            !modalAdd && "bg-neutral-800 hover:bg-neutral-400 hover:text-black"
          } `}
          onClick={(e) => setModalAdd((state: boolean) => !state)}
        >
          <p className={` text-sm ${!modalAdd ? "flex" : "hidden"}`}>
            Agregar usuario
          </p>
          <span
            style={{ color: selectColor(color) }}
            className={`transition rotate-180 text-neutral-100 ${
              modalAdd && "rotate-45"
            } opacity-80 hover:opacity-100`}
          >
            <MdAdd size={27} />
          </span>
        </button>
      }
    </div>
  );
};

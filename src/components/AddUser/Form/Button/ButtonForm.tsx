import { Dispatch, SetStateAction } from "react";

interface Props {
  setModalAdd: Dispatch<SetStateAction<boolean>>;
}

export const ButtonForm: React.FC<Props> = ({ setModalAdd }) => {
  return (
    <div className={` w-full flex flex-row-reverse justify-center py-2`}>
      <button
        className={`p-1 text-gray-200 font-normal rounded-md m-1 px-4 transition bg-sky-800 hover:bg-sky-700 focus:scale-95`}
        type="submit"
      >
        Agregar
      </button>
      <button
        className={`p-1 text-gray-400 border rounded-md m-1 px-2 font-normal buttonCancel transition focus:scale-95 hover:bg-neutral-800 hover:text-gray-200 `}
        onClick={() => setModalAdd(false)}
      >
        Cancelar
      </button>
    </div>
  );
};

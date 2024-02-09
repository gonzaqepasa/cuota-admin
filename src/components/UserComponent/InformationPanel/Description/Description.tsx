import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { editDescription } from "../../../../logic/editDescription";
import Loading from "../../../Loading/Loading";

interface Props {
  id: Number;
  description: string | undefined;
  color: string;
  getDataAgain: () => void;
}

export const Description: React.FC<Props> = ({
  id,
  description,
  color,
  getDataAgain,
}) => {
  // Component...
  const [load, setLoad] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const [descript, setDescript] = useState(description);
  if (load)
    return (
      <div className={` h-24 flex  items-center justify-center w-5/6`}>
        <Loading size={30} />
      </div>
    );
  return (
    <div className={` h-24  w-full cursor-text`}>
      <h5 className={`${editOn && "relative z-20"}`} style={{ color }}>
        Descripción:
      </h5>
      <div className={` flex items-center`}>
        {editOn ? (
          <>
            <div
              className={`relative flex rounded p-1 backg-input-edit ${
                editOn && "z-20"
              } w-full`}
            >
              <textarea
                className={`w-full bg-transparent transition duration-500  ${
                  descript === description
                    ? "border-neutral-400"
                    : "border-green-600"
                } font-light text-neutral-200 border-b-2 resize-none `}
                value={descript}
                onChange={(e) => {
                  setDescript(e.target.value);
                }}
                placeholder="Ingresar descripción..."
              />
              <div className={`flex flex-col items-center justify-between`}>
                <button
                  onClick={(e) => {
                    setLoad(true);
                    editDescription(
                      e,
                      { id: Number(id), description: descript },
                      getDataAgain,
                      setEditOn,
                      setLoad
                    );
                  }}
                  className={`text-neutral-200 font-light transition-colors bg-cyan-900 text-sm hover:bg-cyan-800 px-3 rounded`}
                >
                  Cambiar
                </button>
                <button
                  className={`text-neutral-400 font-light transition-colors hover:text-neutral-300 text-sm`}
                  onClick={() => {
                    setEditOn(false);
                    setDescript(description);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setDescript(description);

                setEditOn(false);
              }}
              className="fixed h-full w-screen top-0 left-0 opacity-80 z-10 bg-black"
            ></button>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                setEditOn(true);
              }}
              className={`relative flex h-16 overflow-y-auto rounded p-1   w-full`}
            >
              {descript ? (
                <p className="font-light text-sm text-neutral-300 pr-4">
                  {descript}
                </p>
              ) : (
                <p className={`font-light text-neutral-600`}>
                  {" "}
                  Ingresar descripción...
                </p>
              )}
              <button
                onClick={() => {
                  setEditOn(true);
                }}
                className={`absolute right-2`}
              >
                <FaEdit color={color} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

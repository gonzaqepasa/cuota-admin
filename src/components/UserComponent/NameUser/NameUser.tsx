import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import { fromNameToUrl } from "../../../logic/fromNameToUrl";
import { selectColor } from "../../../logic/selectColor";
import { VscEdit } from "react-icons/vsc";
import { LinkDeptor } from "../../Deptor/LinkDeptor/LinkDeptor";

import { FcCheckmark, FcCancel } from "react-icons/fc";
import { validateFormInputs } from "../../AddUser/logic/validateAddInputs";
import Loading from "../../Loading/Loading";
import { editName } from "../../../logic/editName";

interface Props {
  user: any;
  getDataAgain: () => void;
}

export const NameUser: React.FC<Props> = ({ user, getDataAgain }) => {
  const [name, setName] = useState(user.name);
  const [load, setLoad] = useState(false);
  const [nameVal, setNameVal] = useState({
    val: false,
    msg: "",
  });

  const [editOn, setEditOn] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
    if (nameVal.val) setNameVal({ val: false, msg: "" });
  }

  function handleSubmit(): void {
    if (name === user.name) return setEditOn(false);
    validateFormInputs(name, setNameVal) &&
      setName(
        editName(
          { id: user.id, name },
          getDataAgain,
          setEditOn,
          setLoad,
          setName
        )
      );

    // console.log(nameVal);
    // console.log("submit");
    // console.log(name);
  }

  return (
    <div className={`w-full flex  relative`}>
      {!load ? (
        <div className={`h-8  `}>
          {editOn ? (
            <>
              <div
                className={`flex backg-input-edit relative h-full z-20 items-center p-1 rounded`}
              >
                <input
                  placeholder="Ingrese nombre..."
                  value={name}
                  onChange={(e) => handleChange(e)}
                  autoComplete={"none"}
                  type="text"
                  className={` h-full transition font-lightasd text-neutral-200 px-1 pr-10 bg-transparent ${
                    nameVal.val
                      ? "  border-red-700 border-b-2"
                      : "border-green-700 border-b-2"
                  }`}
                ></input>
                <div className={"mx-1 right-0 flex  items-center"}>
                  <button
                    onClick={() => handleSubmit()}
                    className={`opacity-80 transition-opacity hover:opacity-100`}
                  >
                    <FcCheckmark size={20} />
                  </button>
                  <button
                    className={`mx-1 opacity-80 transition-opacity hover:opacity-100`}
                    onClick={() => {
                      setEditOn(false);
                      setName(user.name);
                      setNameVal({ val: false, msg: "" });
                    }}
                  >
                    <FcCancel size={20} />
                  </button>
                </div>

                {nameVal.val && (
                  <p
                    className={`absolute -top-4 text-red-600 font-extralight text-xs`}
                  >
                    {nameVal.msg}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setEditOn(false);
                  setName(user.name);
                }}
                className="fixed h-full w-screen top-0 left-0 opacity-80 z-10 bg-black"
              ></button>
            </>
          ) : (
            <div className={`flex  items-center `}>
              <h2 className={`text-neutral-200 text-2xl`}>
                {firstLetterUpper(name)}
              </h2>
              <button
                className={`flex absolute right-0 items-center ml-2 text-neutral-100 bg-neutral-600 p-1 rounded-md text-xs  transition-colors hover:bg-cyan-900`}
                onClick={() => setEditOn(true)}
              >
                <VscEdit size={13} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={`h-8`}>
          <Loading size={20} />
        </div>
      )}
    </div>
  );
};

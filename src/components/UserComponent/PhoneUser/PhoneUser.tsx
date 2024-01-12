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
import { typesUser } from "../../../types/types-user";
import { editPhoneLogic } from "../../../logic/editPhone";

interface Props {
  user: typesUser;
  getDataAgain: () => void;
}

export const PhoneUser: React.FC<Props> = ({ user, getDataAgain }) => {
  const [phone, setPhone] = useState(user.phone || "No hay telefono");
  const [load, setLoad] = useState(false);
  const [nameVal, setNameVal] = useState({
    val: false,
    msg: "",
  });

  const [editOn, setEditOn] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setPhone(e.target.value);
    // if (nameVal.val) setNameVal({ val: false, msg: "" });
  }

  function handleSubmit(): void {
    editPhoneLogic(
      { id: user.id, phone },
      getDataAgain,
      setEditOn,
      setLoad,
      setPhone
    );
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
                  placeholder="Ingrese numero..."
                  value={phone}
                  onChange={(e) => handleChange(e)}
                  autoComplete={"none"}
                  type="number"
                  className={` h-full transition font-lightasd text-neutral-200 px-1 pr-10 bg-transparent `}
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
                      setPhone(user.phone || "No hay telefono");
                      setNameVal({ val: false, msg: "" });
                    }}
                  >
                    <FcCancel size={20} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditOn(false);
                  setPhone(user.phone || "No hay telefono");
                }}
                className="fixed h-full w-screen top-0 left-0 opacity-80 z-10 bg-black"
              ></button>
            </>
          ) : (
            <div className={`flex gap-1 items-center `}>
              <h2 className={`text-neutral-200 text-md`}>
                {phone || "No hay telefono"}
              </h2>
              <a
                className={`text-blue-400 text-xs ${
                  user.phone ? "flex" : "hidden"
                }`}
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/+54${user.phone}?text=Este%20es%20el%20enlace%20para%20ver%20tus%20cuotas%20https//cuota-admin.vercel.app/client/e3g546345$${user.id}$354hfg34`}
              >
                Compartir pagos
              </a>
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

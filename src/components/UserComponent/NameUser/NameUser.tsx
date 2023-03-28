import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import { fromNameToUrl } from "../../../logic/fromNameToUrl";
import { selectColor } from "../../../logic/selectColor";
import { VscEdit } from "react-icons/vsc";
import { LinkDeptor } from "../../Deptor/LinkDeptor/LinkDeptor";
import styles from "./NameUser.module.scss";
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
    <div className={styles.allNameUser}>
      {!load ? (
        <div className={`${styles.staticBox} `}>
          {editOn ? (
            <div className={styles.inputContainer}>
              {nameVal.val && <p className={styles.errorMsg}>{nameVal.msg}</p>}
              <input
                value={name}
                onChange={(e) => handleChange(e)}
                autoComplete={"none"}
                type="text"
                className={`${styles.nameInput} ${nameVal.val && styles.err}`}
              ></input>
              <div className={styles.btnBox}>
                <button
                  onClick={() => handleSubmit()}
                  className={styles.btnAcept}
                >
                  <FcCheckmark />
                </button>
                <button
                  className={styles.btnCancel}
                  onClick={() => {
                    setEditOn(false);
                    setName(user.name);
                    setNameVal({ val: false, msg: "" });
                  }}
                >
                  <FcCancel />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.nameContainer}>
              <h2
              /*    style={{
                borderBottom: `solid 2px ${selectColor(
                  user.activity.nameActivity
                )}`,
              }} */
              >
                {firstLetterUpper(name)}
              </h2>
              <button onClick={() => setEditOn(true)}>
                <VscEdit />
                <p>editar</p>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={`${styles.staticBox}`}>
          <Loading size={20} />
        </div>
      )}
    </div>
  );
};

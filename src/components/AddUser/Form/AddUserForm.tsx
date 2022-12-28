import styles from "./AddUserForm.module.scss";

import { typesUser } from "../../../types/types-user";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { typesActivityGym } from "../../../../pages/gym";
import { handleSelect } from "../logic/handle-functions";
import { createCalendar2023 } from "../logic/createCalendar";
import { addUser } from "../../../../firebase/cloudFirestore/addUser";
import { validateFormInputs } from "../logic/validateAddInputs";

type typesPropsForm = {
  activity: typesActivityGym;
  setActivity: Dispatch<SetStateAction<typesActivityGym>>;
  setModalAdd: Dispatch<SetStateAction<boolean>>;
  modalityOptions: string[];
};

export default function AddUserForm({
  modalityOptions,
  activity,
  setActivity,
  setModalAdd,
}: typesPropsForm) {
  //////////////// Estados de los inputs ////////////////
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState(0);
  const [description, setDescription] = useState("");
  ///////////////////////////////////////////////////////

  //////////////// Estados para validar inputs ////////////////
  const [nameVal, setNameVal] = useState({
    val: false,
    msg: "",
  });

  ////////////////////////////////////////////////////////////
  const toSendObj: typesUser = {
    name,
    phone,
    email,
    dni,
    description,
    activity,
    active: true,
    installments: {
      2023: createCalendar2023(),
    },
  };
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    validateFormInputs(name, setNameVal) && addUser(toSendObj);
  }

  return (
    <div
      // onClick={() => setModalAdd(false)}
      className={`${styles.allAddUserForm}`}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`${styles.inputLabelBox}`}>
          <label htmlFor="">Modalidad</label>
          <select
            onChange={(e) => handleSelect(e.target.value, setActivity)}
            name="activity"
            id=""
          >
            {modalityOptions.map((el: string) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.inputLabelBox}`} id="name">
          <label>
            Nombre <i style={{ color: "red" }}>*</i>
          </label>
          <input
            autoComplete="none"
            placeholder="Ingrese nombre..."
            className={`${nameVal.val && styles.nameValInput}`}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <i className={`${nameVal.val && styles.nameValItalic}`}>
            {nameVal.msg}
          </i>
        </div>
        <div className={`${styles.inputLabelBox}`}>
          <label>Celular</label>
          <input
            placeholder="Ingrese celular..."
            autoComplete={"none"}
            onChange={(e) => setPhone(Number(e.target.value))}
            name="phone"
            type={"number"}
          />
        </div>
        <div className={`${styles.inputLabelBox}`}>
          <label>E-mail</label>
          <input
            placeholder="Ingrese correo..."
            autoComplete="none"
            onChange={(e) => setEmail(e.target.value)}
            name="name"
          />
        </div>
        <div className={`${styles.inputLabelBox}`}>
          <label>D.N.I</label>
          <input
            placeholder="Ingrese documento..."
            autoComplete="none"
            onChange={(e) => setDni(Number(e.target.value))}
            maxLength={8}
            minLength={7}
            name="number"
          />
        </div>
        <div className={`${styles.inputLabelBox}`}>
          <label>Descripcion</label>
          <textarea
            placeholder="Ingrese alguna descripción..."
            autoComplete="none"
            onChange={(e) => setDescription(e.target.value)}
            name="number"
          />
        </div>
        <div className={`${styles.btnContainer}`}>
          <button className={`${styles.btnAccept}`} type="submit">
            Agregar
          </button>
          <button
            className={`${styles.btnCancel}`}
            onClick={() => setModalAdd(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

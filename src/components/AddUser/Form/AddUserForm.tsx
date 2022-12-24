import styles from "./AddUserForm.module.scss";

import { typesUser } from "../../../types/types-user";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { typesActivityGym } from "../../../../pages/gym";
import { handleSelect } from "../logic/handle-functions";
import { createCalendar2023 } from "../logic/createCalendar";
import { addUser } from "../../../../firebase/cloudFirestore/addUser";

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
  // Estados de los inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState(0);
  const [description, setDescription] = useState("");

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
    addUser(toSendObj);
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

        <div className={`${styles.inputLabelBox}`}>
          <label>
            Nombre <i style={{ color: "red" }}>*</i>
          </label>
          <input onChange={(e) => setName(e.target.value)} name="name" />
        </div>
        <div className={`${styles.inputLabelBox}`}>
          <label>Celular</label>
          <input
            onChange={(e) => setPhone(Number(e.target.value))}
            name="phone"
            type={"number"}
          />
        </div>
        <div className={`${styles.inputLabelBox}`}>
          <label>E-mail</label>
          <input onChange={(e) => setEmail(e.target.value)} name="name" />
        </div>
        <div className={`${styles.inputLabelBox}`}>
          <label>D.N.I</label>
          <input
            onChange={(e) => setDni(Number(e.target.value))}
            maxLength={8}
            minLength={7}
            name="number"
          />
        </div>
        <div className={`${styles.inputLabelBox}`}>
          <label>Descripcion</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="number"
          />
        </div>
        <div>
          <button type="submit">Agregar</button>
          <button onClick={() => setModalAdd(false)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

import styles from "./AddUserForm.module.scss";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { handleSelect } from "../logic/handle-functions";
import { validateFormInputs } from "../logic/validateAddInputs";
import { createUser } from "../../../logic/createUser";
import { typesActivity } from "../../../types/types-user";
import { selectColor } from "../../../logic/selectColor";
import Loading from "../../Loading/Loading";
import { useRouter } from "next/router";

interface Props {
  // setActivity: Dispatch<SetStateAction<typesActivityGym>>;
  setModalAdd: Dispatch<SetStateAction<boolean>>;
  // modalityOptions: string[];
  getDataAgain: () => void;
  dataActivity: typesActivity[];
}

export const AddUserForm: React.FC<Props> = ({
  // modalityOptions,
  // activity,
  // setActivity,
  setModalAdd,
  getDataAgain,
  dataActivity,
}) => {
  const [load, setLoad] = useState(false);
  const route = useRouter();
  //////////////// Estados de los inputs ////////////////
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState(0);
  const [activity, setActivity] = useState(dataActivity[0].id);
  const [description, setDescription] = useState("");
  ///////////////////////////////////////////////////////

  //////////////// Estados para validar inputs ////////////////
  const [nameVal, setNameVal] = useState({
    val: false,
    msg: "",
  });

  ////////////////////////////////////////////////////////////
  const toSendObj: { name: string; description: string; activityId: number } = {
    name,
    description,
    activityId: activity,
  };
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    validateFormInputs(name, setNameVal) &&
      createUser({
        objData: toSendObj,
        nameUser: name,
        setModalAdd,
        getDataAgain,
        dataActivity,
        setLoad,
        cb: ({ id }) => route.push(`/user/${id}`),
      });
  }
  if (load)
    return (
      <div className={styles.allAddUserForm}>
        <Loading />;
      </div>
    );

  return (
    <div
      // onClick={() => setModalAdd(false)}
      className={`${styles.allAddUserForm}`}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`${styles.inputLabelBox}`}>
          <label
            // style={{ color: selectColor(dataActivity[0].nameActivity) }}
            htmlFor=""
          >
            Modalidad
          </label>
          <select
            onChange={(e) => handleSelect(e.target.value, setActivity)}
            name="activity"
            id=""
            style={{ color: selectColor(dataActivity[0].nameActivity) }}
          >
            {dataActivity.map((el: typesActivity) => (
              <option key={el.id} value={el.id}>
                {el.modality}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.inputLabelBox}`} id="name">
          <label
          //  style={{ color: selectColor(dataActivity[0].nameActivity) }}
          >
            Nombre y apellido <i style={{ color: "red" }}>*</i>
          </label>
          <input
            autoComplete="none"
            placeholder="Ingrese nombre..."
            className={`${nameVal.val && styles.nameValInput}`}
            onChange={(e) => setName(e.target.value)}
            name="name"
            style={{ color: selectColor(dataActivity[0].nameActivity) }}
          />
          <i className={`${nameVal.val && styles.nameValItalic}`}>
            {nameVal.msg}
          </i>
        </div>

        <div className={`${styles.inputLabelBox}`}>
          <label
          // style={{ color: selectColor(dataActivity[0].nameActivity) }}
          >
            Descripcion
          </label>
          <textarea
            style={{ color: selectColor(dataActivity[0].nameActivity) }}
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
};

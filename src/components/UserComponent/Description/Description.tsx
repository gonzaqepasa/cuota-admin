import styles from "./Description.module.scss";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { typesUser } from "../../../types/types-user";
import { editDescription } from "../../../logic/editDescription";

export default function Description({
  id,
  description,
  getDataAgain,
}: {
  id: Number;
  description: string | undefined;
  getDataAgain: Function;
}) {
  // Component...
  const [editOn, setEditOn] = useState(false);
  const [descript, setDescript] = useState(description);
  return (
    <div className={`${styles.allDescription}`}>
      <h5>Descripción:</h5>
      <div className={styles.detailContainer}>
        {editOn ? (
          <>
            <input
              value={descript}
              onChange={(e) => {
                setDescript(e.target.value);
              }}
              placeholder="Ingrese descripción..."
            />
            <div className={`${styles.btnAcpCanBox}`}>
              <button
                onClick={(e) => editDescription(e,{id:Number(id),description:descript},getDataAgain,setEditOn)}
                className={`${styles.btnAcp}`}
              >
                Cambiar
              </button>
              <button
                onClick={() => {
                  setEditOn(false);
                  setDescript(description);
                }}
                className={`${styles.btnCan}`}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <p>{descript}</p>
            <button
              onClick={() => {
                setEditOn(true);
              }}
              className={`${styles.btnChangeDescription}`}
            >
              <FaEdit />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

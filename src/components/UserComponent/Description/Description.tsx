import styles from "./Description.module.scss";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { typesUser } from "../../../types/types-user";
import { editDescription } from "../../../logic/editDescription";
import Loading from "../../Loading/Loading";

interface Props {
  id: Number;
  description: string | undefined;
  color: string;
  getDataAgain: Function;
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
      <div className={styles.allDescription}>
        <Loading />
      </div>
    );
  return (
    <div className={`${styles.allDescription} `}>
      <h5 style={{ color }}>Descripción:</h5>
      <div className={styles.detailContainer}>
        {editOn ? (
          <div className={styles.editOnDescription}>
            <input
              value={descript}
              onChange={(e) => {
                setDescript(e.target.value);
              }}
              placeholder="Ingrese descripción..."
            />
            <div className={`${styles.btnAcpCanBox}`}>
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
          </div>
        ) : (
          <>
            <p>{descript}</p>
            <button
              onClick={() => {
                setEditOn(true);
              }}
              className={`${styles.btnChangeDescription}`}
            >
              <FaEdit color={color} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

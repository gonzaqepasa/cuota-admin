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
      <div className={styles.descriptionContainer}>
        <Loading />
      </div>
    );
  return (
    <div className={styles.descriptionContainer}>
      <div className={`${styles.allDescription} `}>
        <h5 style={{ color }}>Descripción:</h5>
        <div className={styles.detailContainer}>
          {editOn ? (
            <>
              <div className={`z-20 ${styles.editOnDescription}`}>
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
              <button
                onClick={() => {
                  setEditOn(false);
                }}
                className="fixed h-full w-screen top-0 left-0 opacity-80 z-10 bg-black"
              ></button>
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
                <FaEdit color={color} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

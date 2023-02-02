import { typesActivity } from "../../../types/types-user";
import { useState, Dispatch, SetStateAction } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { selectColor } from "../../../logic/selectColor";
import { numberToMoney } from "../../../logic/numberToMoney";
import styles from "./EditPrice.module.scss";
import { editPrice } from "../../../logic/editPrice";

export default function EditPriceModal({ data }: { data: typesActivity }) {
  const [editOn, setEditOn] = useState(false);
  const [newPrice, setNewPrice] = useState(data.price);

  function handlePriceChange(e: number, cb: Dispatch<SetStateAction<number>>) {
    e > -1 && e < 9999 ? cb(e) : console.log("Numero fuera de los limites");
  }

  return editOn ? (
    <div className={styles.allEditPirceModal}>
      <div className={styles.boxModal}>
        <input
          onChange={(e) =>
            handlePriceChange(Number(e.target.value), setNewPrice)
          }
          value={newPrice}
          id="newprice"
          type="number"
          min={1}
          max={9999}
        />
        <div className={styles.btnBox}>
          <button
            className={styles.btnAce}
            onClick={(e) =>
              editPrice(
                e,
                {
                  price: newPrice,
                  nameActivity: data.nameActivity,
                  modality: data.modality,
                  id: data.id,
                },
                setNewPrice,
                setEditOn
              )
            }
          >
            Aceptar
          </button>
          <button className={styles.btnCan} onClick={() => {
            setEditOn(false)
            setNewPrice(data.price)
            }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p style={{ position: "relative", fontWeight: 600 }}>
      {numberToMoney(newPrice)}
      <AiOutlineEdit
        onClick={() => {
          setEditOn(true);
        }}
        color={selectColor(data.nameActivity)}
        style={{
          position: "relative",
          left: 10,
          fontSize: "1.4rem",
          cursor: "pointer",
        }}
      />
    </p>
  );
}

import { MouseEvent, useState } from "react";
import { editTurno } from "../../../firebase/cloudFirestore/editTurno";
import { typesUser } from "../../types/types-user";
import styles from "./User.module.scss";

interface typesProps {
  userData: typesUser;
  id: string;
}

export default function User({ userData, id }: typesProps) {
  const [monthData, setMonthData] = useState<any>(userData.installments[2023]);
  function handleEditTurno(
    e: MouseEvent<HTMLButtonElement>,
    monthName: string
  ) {
    e.preventDefault();
    editTurno(id, monthName, monthData, setMonthData);
  }

  console.log("esto es userdata", userData);
  if (userData)
    return (
      <div className={`${styles.allUserComponent}`}>
        {/* <p>2023</p> */}
        <div>
          <h1>{userData.name}</h1>
        </div>
        <div className={`${styles.monthsContainer}`}>
          {monthData.map((el: any) => (
            <div className={`${styles.monthBox}`}>
              <div></div>
              <div>
                <h4>{el.monthName}</h4>
                {el.isPay ? (
                  <div>
                    <h3>Icono</h3>
                    <h3>{el.addAdmin}</h3>
                    <p>{el.addData}</p>
                  </div>
                ) : (
                  <button onClick={(e) => handleEditTurno(e, el.monthName)}>
                    Agregar pago
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  return <div>No existe este usuario</div>;
}

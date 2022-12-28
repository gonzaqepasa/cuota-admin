import { MouseEvent, useState } from "react";
import { editTurno } from "../../../firebase/cloudFirestore/editTurno";
import { typesUser } from "../../types/types-user";
import styles from "./User.module.scss";
import Swal from "sweetalert2";

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
    Swal.fire({
      reverseButtons: true,
      background: "#090202",
      color: "white",
      title: "Estas seguro?",
      text: `${userData.name} pago el mes de ${monthName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si pago",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        editTurno(id, monthName, monthData, setMonthData);
        Swal.fire({
          background: "black",
          color: "white",
          title: "Pago Agregado!",
          text: `${userData.name} pago el mes de ${monthName}`,
          icon: "success",
        });
      }
    });
    e.preventDefault();
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
            <div key={el.monthName} className={`${styles.monthBox}`}>
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

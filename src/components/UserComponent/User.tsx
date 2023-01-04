import { MouseEvent, useState } from "react";
import { editTurno } from "../../../firebase/cloudFirestore/editTurno";
import { typesUser } from "../../types/types-user";
import styles from "./User.module.scss";
import Swal from "sweetalert2";
import { auth } from "../../../firebase/firebaseConfig";
import { FcCheckmark } from "react-icons/fc";
import { FaMoneyBillWave } from "react-icons/fa";

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
        editTurno(
          id,
          monthName,
          monthData,
          setMonthData,
          auth.currentUser?.email
        );
      }
    });
    e.preventDefault();
  }

  console.log("esto es userdata", userData);
  if (userData)
    return (
      <div className={`${styles.allUserComponent}`}>
        {/* <p>2023</p> */}
        <div className={styles.nameUserBox}>
          <h2>{userData.name}</h2>
          <h3>{userData.activity.name.toUpperCase()}</h3>
        </div>

        {userData.description && (
          <div className={styles.detailContainer}>
            <p>{userData.description}</p>
          </div>
        )}
        {/*  <--- Contenedor de Card */}
        <div className={`${styles.monthsContainer}`}>
          {monthData.map((el: any) => (
            ///////////////// Componente CardMonth /////////////////
            <div key={el.monthName} className={`${styles.monthBox}`}>
              <div className={styles.monthNameBox}>
                <h4> {el.monthName}</h4>
              </div>
              <div className={`${styles.conditionIsPayContainer}`}>
                {el.isPay ? (
                  <span>
                    <div className={styles.checkImgContainer}>
                      <span>
                        <FcCheckmark />
                      </span>
                    </div>
                    <h3>{el.addAdmin}</h3>
                    <p>{el.addData}</p>
                  </span>
                ) : (
                  <div className={styles.allBtnContainer}>
                    <button onClick={(e) => handleEditTurno(e, el.monthName)}>
                      <FaMoneyBillWave /> <p>Agregar pago</p>
                    </button>
                  </div>
                  ///////////////////////////////////////////////////
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  return <div>No existe este usuario</div>;
}

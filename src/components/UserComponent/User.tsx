import { MouseEvent, useState } from "react";
import { typesUser } from "../../types/types-user";
import styles from "./User.module.scss";
import Swal from "sweetalert2";
import { auth } from "../../../firebase/firebaseConfig";
import { FcCheckmark } from "react-icons/fc";
import { FaMoneyBillWave, FaEdit } from "react-icons/fa";
import { handleEditTurno } from "../../logic/editTurno";
import { orderByMonth } from "../../logic/orderByMonthName";
import Description from "./Description/Description";
import { selectColor } from "../../logic/selectColor";
import { fromNameToUrl } from "../../logic/fromNameToUrl";
import { Carousel } from "react-bootstrap";

interface typesProps {
  userData: typesUser;
  id: string;
}

export default function User({ userData, id }: typesProps) {
  const [monthData, setMonthData] = useState<any>(
    orderByMonth(userData.calendar.months)
  );
  const [user, setUser] = useState(userData);

  async function getUserAgain() {
    try {
      const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
      const res = await fetch(`http://${url}/user/get-user?USER=${id}`);
      const data = await res.json();
      setMonthData(orderByMonth(data.calendar.months));
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }
//  console.log( Math.floor(Math.random()*10000))
  console.log("esto es userdata", userData);
  if (user)
    return (
      <div
        className={`${styles.allUserComponent} background-${fromNameToUrl(
          userData.activity.nameActivity.toLowerCase()
        )}`}
      >
        {/* <p>2023</p> */}
        <div className={styles.nameUserBox}>
          <h2
            style={{
              borderBottom: `solid 2px ${selectColor(
                user.activity.nameActivity
              )}`,
            }}
          >
            {user.name}
          </h2>
          <h3 style={{ color: selectColor(user.activity.nameActivity) }}>
            {user.activity.nameActivity.toUpperCase()}
          </h3>
        </div>

        {/*  <--- Contenedor de Card */}

        <div className={styles.descriptionContainer}>
          <Description
            id={Number(id)}
            color={selectColor(user.activity.nameActivity)}
            description={user.description}
            getDataAgain={getUserAgain}
          />
        </div>
        <div className={`${styles.monthsContainer}`}>
          {monthData.map((el: any) => (
            ///////////////// Componente CardMonth /////////////////
            <div
              key={el.monthName}
              className={`${styles.monthBox} ${
                !userData.active && styles.isInactive
              }`}
            >
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

                    <Carousel controls={false} interval={3000} indicators={false}>
                      <Carousel.Item>
                        <h3>{el.addAdmin}</h3>
                      </Carousel.Item>
                      <Carousel.Item>
                        <p>{el.addData}</p>
                      </Carousel.Item>
                    </Carousel>
                  </span>
                ) : (
                  <div className={styles.allBtnContainer}>
                    <h4
                      style={{ color: selectColor(user.activity.nameActivity) }}
                    >
                      {el.monthName}
                    </h4>
                    <button
                      disabled={!userData.active}
                      onClick={(e) =>
                        handleEditTurno(
                          e,
                          el.id,
                          userData.name,
                          el.monthName,
                          auth.currentUser?.email,
                          "MP",
                          getUserAgain
                        )
                      }
                    >
                      <FaMoneyBillWave
                        color={selectColor(user.activity.nameActivity)}
                      />{" "}
                      <p>Agregar pago</p>
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

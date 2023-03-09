import { selectColor } from "../../../logic/selectColor";
import { typesMonth, typesUser } from "../../../types/types-user";
import styles from "./RenderUser.module.scss";
import { FcCheckmark } from "react-icons/fc";
import { FaMoneyBillWave, FaEdit } from "react-icons/fa";
import Image from "next/image";
import mp from "../../../../styles/mp.png";
import { numberToMoney } from "../../../logic/numberToMoney";
import { payMonth } from "../../../logic/payMonth";
import { auth } from "../../../../firebase/firebaseConfig";

interface Props {
  monthData: any;
  user: any;
  userData: typesUser;
  getUserAgain: () => void;
}

export const RenderUser: React.FC<Props> = ({
  user,
  monthData,
  userData,
  getUserAgain,
}) => {
//   return <div className={`${styles.monthsContainer}`}>

// <div>

// </div>
// <div></div>







//   </div>;
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  return (
    <div className={`${styles.monthsContainer}`}>
      {monthData.map((el: typesMonth) => (
        ///////////////// Componente CardMonth /////////////////
        <div
          className={`${styles.monthBox} ${el.isPay && styles.isPay} `}
          key={el.monthName}
        >
          {/* ////////////// Priemra Caja ////////////// */}
          <div className={styles.monthNameBox}>
            <p
              style={{
                borderBottom: `2px solid ${selectColor(
                  userData.activity.nameActivity
                )}`,
              }}
            >
              {el.monthName}
            </p>
          </div>
          {/* ////////////// Segunda Caja ////////////// */}
          <div className={styles.conditionIsPayContainer}>
            {el.isPay ? (
              <div className={`${styles.checkedBox}`}>
                <FcCheckmark />
                {el.mothodPay === "MP" ? (
                  <Image src={mp} height={25} alt="no se encontr imagen" />
                ) : (
                  <FaMoneyBillWave />
                )}
                <p>{numberToMoney(el.pricePay)}</p>
              </div>
            ) : (
              <div className={styles.isFalse}>
                <button
                  className={styles.btnPay}
                  disabled={!userData.active}
                  onClick={(e) =>
                    payMonth(
                      e,
                      el.id,
                      userData.name,
                      el.monthName,
                      auth.currentUser?.email,
                      userData.activity.price,
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
            )}
          </div>

          {/* ////////////// Ultima Caja ////////////// */}
          {el.isPay && (
            <div className={`${styles.carrouselBox}`}>
              <p>{el.addData}</p>
              <h3>{el.addAdmin}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

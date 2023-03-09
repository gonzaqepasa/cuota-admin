import { selectColor } from "../../../logic/selectColor";
import { typesMonth, typesUser } from "../../../types/types-user";
import styles from "./RenderUser.module.scss";
import { FcCheckmark } from "react-icons/fc";
import { FaMoneyBillWave, FaEdit } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { MdAdd } from "react-icons/md";
import Image from "next/image";
import mp from "../../../../styles/mp.png";
import { numberToMoney } from "../../../logic/numberToMoney";
import { payMonth } from "../../../logic/payMonth";
import { auth } from "../../../../firebase/firebaseConfig";

interface Props {
  monthData: typesMonth[];
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
  return (
    <div className={`${styles.monthsContainer}`}>
      {monthData.map((el, index) => (
        <div className={styles.CardPay} key={index}>
          {/* Nombre de mes  */}
          <div className={styles.nameContainer}>
            <p className={`${styles.label}`}>Mes :</p>
            <p>
              {el.monthName}
              {el.isPay && <FcCheckmark />}
            </p>
          </div>
          {/* Estado del pago  */}
          <div className={styles.stateContainer}>
            <p className={`${styles.label}`}>Estado :</p>
            {el.isPay ? (
              <>
                <p className={styles.pay}>
                  {`Pago `}
                  <i>{numberToMoney(el.pricePay)}</i>
                </p>
                {el.mothodPay === "MP" ? (
                  <Image src={mp} height={25} alt="no se encontr imagen" />
                ) : (
                  <FaMoneyBillWave />
                )}
              </>
            ) : (
              <>
                <p className={styles.noPay}>No Pago</p>
                <FcCancel />
                <button
                  style={{
                    borderBottom: `solid 1px ${selectColor(
                      userData.activity.nameActivity
                    )}`,
                  }}
                  onClick={(e) => {
                    payMonth(
                      e,
                      el.id,
                      userData.name,
                      el.monthName,
                      auth.currentUser?.email,
                      userData.activity.price,
                      getUserAgain
                    );
                  }}
                  className={styles.btnPay}
                >
                  <MdAdd color={selectColor(userData.activity.nameActivity)} />
                  PAGAR MES
                </button>
              </>
            )}
          </div>
          {/* Email de que tomo el pago */}
          <div className={styles.emailContainer}>
            <p className={`${styles.label}`}>Recibió :</p>
            {el.isPay ? <p>{el.addAdmin}</p> : <p>-</p>}
          </div>
          {/* Fecha de cobro */}
          <div className={styles.dateContainer}>
            <p className={`${styles.label}`}>Fecha de cobro :</p>
            {el.isPay ? (
              <p>{el.addData}</p>
            ) : (
              <>
                <p>-</p>
              </>
            )}
          </div>
        </div>
        /////////// -> end card
      ))}
    </div>
  );
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

import { typesMonth, typesUser } from "../../../types/types-user";
import styles from "./RenderUser.module.scss";
import { FcCheckmark } from "react-icons/fc";
import { FaMoneyBillWave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import Image from "next/image";
import mp from "../../../../styles/mp.png";
import { numberToMoney } from "../../../logic/numberToMoney";
import { ButtonPay } from "./btn/Pay/Pay";
import { ButtonCancel } from "./btn/Cancel/Cancel";

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
                <ButtonCancel el={el} getUserAgain={getUserAgain} />
              </>
            ) : (
              <>
                <p className={styles.noPay}>No Pago</p>
                <FcCancel />
                <ButtonPay
                  el={el}
                  userData={userData}
                  getUserAgain={getUserAgain}
                />
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
};

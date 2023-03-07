import { orderById } from "../../logic/orderByMonthName";
import { selectColor } from "../../logic/selectColor";
import { typesActivity } from "../../types/types-user";
import { EditPriceModal } from "./EditPrice/EditPrice";
import styles from "./PricesRender.module.scss";

interface Props {
  data: typesActivity[];
}

export const PricesRender: React.FC<Props> = ({ data }) => {
  // Component...
  return (
    <div className={`${styles.allPricesRender}`}>
      <div className={styles.pricesContainer}>
        {orderById(data).map((el) => (
          <div className={styles.priceBox} key={el.id}>
            {/* <td>{el.id}</td> */}
            <p
              className={styles.nameText}
              style={{
                borderBottom: `1px solid ${selectColor(el.nameActivity)}`,
              }}
            >
              {el.nameActivity}
            </p>
            <p
              style={{
                color: selectColor(el.nameActivity),
              }}
              className={styles.modalityText}
            >
              {el.modality}
            </p>

            <EditPriceModal data={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

import { Table } from "react-bootstrap";
import { orderById } from "../../logic/orderByMonthName";
import { selectColor } from "../../logic/selectColor";
import { typesActivity } from "../../types/types-user";
import EditPriceModal from "./EditPrice/EditPrice";
import styles from "./PricesRender.module.scss";

export default function PricesRender({ data }: { data: typesActivity[] }) {
  // Component...

  return (
    <div className={`${styles.allPricesRender}`}>
      <Table responsive >
        <thead>
          {/* <th>#</th> */}
          <th>Actividad</th>
          <th>Modalidad</th>
          <th>Precio</th>
        </thead>
        <tbody>
          {orderById(data).map((el) => (
            <tr key={el.id}>
              {/* <td>{el.id}</td> */}
              <td
                style={{
                  color: selectColor(el.nameActivity),
                  textShadow: `1px 1px 10px ${selectColor(el.nameActivity)}`,
                  height: "4rem",
                }}
              >
                {el.nameActivity}
              </td>
              <td
                className={styles.modalityText}
                style={{
                  textShadow: `1px 1px 10px ${selectColor(el.nameActivity)}`,
                }}
              >
                {el.modality}
              </td>
              <td className={styles.priceText}>
                {" "}
                <EditPriceModal data={el} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

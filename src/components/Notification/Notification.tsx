import { url } from "../../config/services-url";
import { selectColor } from "../../logic/selectColor";
import { useEffect, useState } from "react";
import { typesMonth, typesUser } from "../../types/types-user";
import styles from "./Notification.module.scss";
import { arrayMonth, dateMonth } from "../Deptor/logic/moths.d";

interface Props {
  //   dataUser: typesUser[];
}

export const Notification: React.FC<Props> = ({}) => {
  const [dataMonths, setDataMonths] = useState<typesMonth[]>([]);
  const random = Math.floor(Math.random() * dataMonths.length);
  //   const dataRender = dataMonths.filter((m)=>);
  console.log("Este es el mes acutual", arrayMonth[dateMonth]);
  ///////////////////////////
  useEffect(() => {
    (async function () {
      try {
        const resMonth = await fetch(
          `${url}/month/get-months?month=${arrayMonth[dateMonth]}`
        );
        const data = await resMonth.json();
        setDataMonths(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  ///////////////////////////
  if (dataMonths.length === 0) return null;
  return (
    <div
      style={{
        border: `solid 2px ${selectColor("asd")}`,
      }}
      className={`${styles.allNotification}`}
    ></div>
  );
};

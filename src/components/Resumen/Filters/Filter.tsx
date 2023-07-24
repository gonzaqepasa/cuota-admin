import { Dispatch, SetStateAction, useState } from "react";
import { typesMonth, typesMonthNames } from "../../../types/types-user";
import { SelectMonth } from "../../Deptor/SelectMonth/SelectMonth";
import { mesActual } from "../../Deptor/logic/moths.d";

interface Props {
  data: typesMonth[];
  setData: Dispatch<SetStateAction<typesMonth[]>>;
}

const Filter: React.FC<Props> = ({ data, setData }) => {
  const handleChangeDate = (e: any) => {
    const day = e.target.value.split("-").reverse();
    // Para corregir el bug del 0 que no se muestra cuando el mes es de un solo caracter EJ: "07"
    day[1] !== undefined && day[1][0] === "0" ? (day[1] = day[1][1]) : day[1];
    day[0] !== undefined && day[0][0] === "0" ? (day[0] = day[0][1]) : day[0];
    const day3 = day.join("/");
    setData(data.filter((el) => el.addData?.includes(day3)));
    console.log(day3);
  };

  return (
    <div>
      <h2>filrtos</h2>
      <div className={`w-72 flex items-center`}>
        {" "}
        <h2>Fechas</h2>
        <div
          className={` border border-neutral-400 m-3  bg-neutral-900 rounded  flex`}
        >
          <input type="date" onChange={(e) => handleChangeDate(e)} />
        </div>
      </div>
    </div>
  );
};

export default Filter;

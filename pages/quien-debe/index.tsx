import axios from "axios";
import { useEffect, useState } from "react";
import { Deptor } from "../../src/components/Deptor/Deptor";
import { arrayMonth } from "../../src/components/Deptor/logic/moths.d";

import Loading from "../../src/components/Loading/Loading";
import { url } from "../../src/config/services-url";
import {
  typesCalendar,
  typesMonth,
  typesMonthNames,
} from "../../src/types/types-user";

export default function CloseMonth() {
  const [load, setLoad] = useState(true);
  const [dataMonths, setDataMonths] = useState([]);
  const [error, setError] = useState({ msg: "" });
  ////////// DATE ////////////
  const date = new Date().getMonth();
  // console.log(date);
  ////////// Meses //////////

  console.log(arrayMonth[date]);

  const [monthSelected, setMonthSelected] = useState<typesMonthNames>(
    arrayMonth[date]
  );
  ///////////////////////////
  useEffect(() => {
    (async function () {
      try {
        const resMonth = await fetch(
          `${url}/month/get-months?month=${monthSelected}`
        );
        const data = await resMonth.json();
        setDataMonths(data);
        setLoad(false);
        console.log(data);
      } catch (err) {
        console.log(err);
        setError({ msg: "Ocurrio un error en bd" });
        setLoad(false);
      }
    })();
  }, [monthSelected]);
  if (load)
    return (
      <div className="loadContainer">
        <Loading />
      </div>
    );
  return dataMonths.length > 0 ? (
    <div className={`main`}>
      <Deptor
        dataMonths={dataMonths}
        monthSelected={monthSelected}
        setMonthSelected={setMonthSelected}
      />
    </div>
  ) : (
    <div></div>
  );
}

interface typesData {}

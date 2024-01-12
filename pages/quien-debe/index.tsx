import axios from "axios";
import { useEffect, useState } from "react";
import { Deptor } from "../../src/components/Deptor/Deptor";
import {
  arrayMonth,
  dateMonth,
} from "../../src/components/Deptor/logic/moths.d";

import Loading from "../../src/components/Loading/Loading";
import { url } from "../../src/config/env_d";
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
  // console.log(date);
  ////////// Meses //////////

  console.log(arrayMonth[dateMonth]);

  const [monthSelected, setMonthSelected] = useState<typesMonthNames>(
    arrayMonth[dateMonth]
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

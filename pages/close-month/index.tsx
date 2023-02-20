import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../src/components/Loading/Loading";
import { url } from "../../src/config/services-url";
import { typesCalendar, typesMonth } from "../../src/types/types-user";

export default function CloseMonth() {
  const [load, setLoad] = useState(true);
  const [dataMonths, setDataMonths] = useState([]);
  const [error, setError] = useState({ msg: "" });

  ////////// activities //////////

  ////////////////////////////////
  useEffect(() => {
    (async function () {
      try {
        const resMonth = await fetch(`${url}/month/get-months`);
        const dataMonths = await resMonth.json();
        setDataMonths(dataMonths);
        setLoad(false);
        console.log(dataMonths);
      } catch (err) {
        console.log(err);
        setError({ msg: "Ocurrio un error en bd" });
        setLoad(false);
      }
    })();
  }, []);
  if (load)
    return (
      <div className="loadContainer">
        <Loading />
      </div>
    );
  return dataMonths.length > 0 ? (
    <div className={`main`}>
      <RenderCategory
        data={dataMonths.filter((m: typesMonth) => m.monthName === "Enero")}
        name={"Gimnasio"}
      />
    </div>
  ) : (
    <div></div>
  );
}

function RenderCategory({ data, name }: { data:any[]; name: string }) {
  console.log(data);
  let prices = 0;
  data.forEach((d) => {
    prices = prices + d.pricePay;
  });
 data.filter(m=> console.log(m.calendar.User?.activity.nameActivity))
  return (
    <div>
      <div>
        <h3>{name}</h3>
      </div>
      <div>
        {data.map((m: typesMonth) => (
          <p>{m.pricePay}</p>
        ))}
      </div>
      <div>{prices}</div>
    </div>
  );
}

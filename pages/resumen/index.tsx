import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../src/config/services-url";
import { typesMonth } from "../../src/types/types-user";
import calculo from "../../src/components/Resumen/calculo";
import Filter from "../../src/components/Resumen/Filters/Filter";

const Resumen = () => {
  const [data, setData] = useState<typesMonth[]>([]);
  const [dataRender, setDataRender] = useState<typesMonth[]>([]);
  // let dataRender = data;
  useEffect(() => {
    (async function () {
      try {
        const resMonth = await fetch(`${url}/month/get-months?ispay=true&`);
        const data = await resMonth.json();
        setData(data);
        setDataRender(data);
        console.log(" esto es el resultado de la peticion", data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="mt-20 bg-neutral-500  ">
      <h1>Resumen</h1>
      {/* RENDER */}
      <div>
        <Filter data={data} setData={setDataRender} />
        {dataRender.map((el, i) => (
          <div className="bg-neutral-300 m-1 flex" key={i}>
            <h3>{el.monthName}</h3>
            <p>{el.pricePay}</p>
            <p>{el.addData}</p>
          </div>
        ))}
      </div>
      <p>{calculo.Total(dataRender)}</p>
    </div>
  );
};

export default Resumen;

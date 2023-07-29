import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../src/config/services-url";
import { typesMonth } from "../../src/types/types-user";
import calculo from "../../src/components/Resumen/calculo";
import FilterDate from "../../src/components/Resumen/Filters/FilterDate";
import { useRouter } from "next/router";
import ResumenLogic from "../../src/components/Resumen/logicResumen";
import FilterAdmin from "../../src/components/Resumen/Filters/FilterAdmin";

const dataFalse = {
  id: 2,
  pricePay: 2000,
  methodPay: "MP",
  isPay: true,
  addData: null,
  activity: {
    name: "Funcional",
    modality: "3 Dias",
  },
  month: {
    id: 2,
    monthNum: 4,
    monthname: "Abril",
    addData: null,
    addAdmin: "gonzalovam@hotmail.com",
    comment: "",
    isPay: true,
    mothodPay: true,
    pricePay: 2000,
    userId: 10,
  },
};

const Resumen = () => {
  // const [data, setData] = useState<typesMonth[]>([]);
  // const [data, setData] = useState<any[]>([dataFalse, dataFalse]);
  const [dataRender, setDataRender] = useState<typesMonth[]>([]);

  /////////////////QUERY///////////////////////
  // Obtener la URL actual
  const router = useRouter();
  const [querys, setQuerys] = useState(router.query);
  // console.log(querys);

  useEffect(() => {
    (async () => {
      try {
        const hola = await ResumenLogic.getResumen(router.query);
        console.log(hola);
        setDataRender(hola);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router.query]);
  // Función para redirigir con una nueva query
  const redirectToNewPage = (newQuery: {}) => {
    // Redirigir a una nueva URL con la query
    const updatedQueries = { ...router.query, ...newQuery };
    setQuerys(updatedQueries);
    router.push({ query: updatedQueries });
  };
  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    (async function () {
      try {
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
        <FilterDate data={querys} setData={setQuerys} />
        <FilterAdmin />
        {dataRender.map((el, i) => (
          <div className="bg-neutral-300 m-1 flex" key={i}>
            Hola
          </div>
        ))}
      </div>
      <p>{calculo.Total(dataRender)}</p>
      <button onClick={() => redirectToNewPage({ edad: 34, signo: "Cancer" })}>
        asdasd
      </button>
    </div>
  );
};

export default Resumen;

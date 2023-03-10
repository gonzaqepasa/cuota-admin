import { url } from "../../src/config/services-url";
import {PricesRender} from "../../src/components/PricesRender/PricesRender";
import { typesActivity } from "../../src/types/types-user";
import { useState, useEffect } from "react";
import Loading from "../../src/components/Loading/Loading";

export default function Prices() {
  // Component...

  const [dataAct, setDataAct] = useState<typesActivity[] | false>(false);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState({ msg: "" });

  useEffect(() => {
    (async function () {
      setLoad(true);
      try {
        const resAct = await fetch(`${url}/activity/get-activity`);
        const dataAct = await resAct.json();
        setDataAct(dataAct);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    })();
  }, []);

  console.log(dataAct);
  if (load)
    return (
      <div className="main">
        <Loading />;
      </div>
    );
  if (typeof dataAct === "boolean")
    return <div className={`main`}>Problemas en el servidor {error.msg}</div>;
  return (
    <div className={`main `}>
      <PricesRender data={dataAct} />
    </div>
  );
}

/* export async function getStaticProps() {
  try {
    const resAct = await fetch(`${url}/activity/get-activity`);
    const dataAct = await resAct.json();

    return {
      props: {
        dataAct,
      },
    };
  } catch (err) {
    return {
      props: {
        dataAct: false,
        // error: err,
      },
    };
  }
}
 */

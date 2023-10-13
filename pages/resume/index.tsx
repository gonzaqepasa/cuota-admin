import { url } from "../../src/config/services-url";
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
        const resRes = await fetch(`${url}/resume/get-resume`);
        const dataRes = await resRes.json();
        setDataAct(dataRes);
        console.log(dataRes)
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    })();
  }, []);

  ////// Render
  if (load)
    return (
      <div className="main">
        <Loading />;
      </div>
    );
  if (typeof dataAct === "boolean")
    return <div className={`main`}>Problemas en el servidor {error.msg}</div>;
  return <main className={`main`}></main>;
}

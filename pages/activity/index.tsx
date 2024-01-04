import { ID_BUSINESS, url } from "../../src/config/env_d";
import { useState, useEffect } from "react";
import Loading from "../../src/components/Loading/Loading";
import axios from "axios";
import { deleteActivityLogic } from "../../src/logic/deleteActivity";

import { useRouter } from "next/router";
import { typesActivity } from "../../src/types/types-user";
import FormAddActivity from "../../src/components/Activity/FormAddActivity";
import RenderActivities from "../../src/components/Activity/RenderActivities";

export default function Activity() {
  // Component...
  const [dataAct, setDataAct] = useState<typesActivity[] | false>(false);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState({ msg: "" });

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(
          `${url}/api/activity/getAll?id_business=${ID_BUSINESS}`
        );

       
        setDataAct(data);
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
  return (
    <main className={`main text-neutral-300`}>
      <FormAddActivity setLoad={setLoad} />
      <RenderActivities dataAct={dataAct} />
    </main>
  );
}

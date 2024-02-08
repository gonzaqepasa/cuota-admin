import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonAdd } from "../../../src/components/AddUser/ButtonAdd/ButtomAdd";
import { AddUserForm } from "../../../src/components/AddUser/Form/AddUserForm";
import { Title } from "../../../src/components/Title/Title";
import Loading from "../../../src/components/Loading/Loading";
import { RenderList } from "../../../src/components/RenderList/RenderList";
import { url } from "../../../src/config/env_d";
import { typesActivity } from "../../../src/types/types-user";
import { Notification } from "../../../src/components/Notification/Notification";
import ProviderAuth from "../../../app/ProviderAuth";

export default function List() {
  const router = useRouter();
  const { activity } = router.query;
  // console.log(activity);

  // Estados de componente
  const [modalAdd, setModalAdd] = useState(false);
  const [load, setLoad] = useState(true);

  const [dataUser, setDataUser] = useState([]);
  const [dataActivity, setDataActivity] = useState([]);
  const [error, setError] = useState({ msg: "" });

  //Para obtener datos apenas ingresas a la pagina
  useEffect(() => {
    (async function () {
      setLoad(true);
      try {
        const resAct = await fetch(
          `${url}/activity/get-activity?activity=${activity}`
        );
        const dataAct = await resAct.json();
        (await dataAct.length) === 0 &&
          setError({ msg: "Esta actividad no existe" });
        setDataActivity(dataAct);
        const resUser = await fetch(
          `${url}/user/get-users?activity=${activity}`
        );
        const dataUser = await resUser.json();
        setDataUser(dataUser);
        setLoad(false);
        setError({ msg: "" });
        // console.log(dataUser);
      } catch (err) {
        setLoad(false);
        setError({ msg: "Problemas con la bd" });
        console.log(err);
      }
    })();
  }, [activity]);

  async function getDataAgain() {
    setLoad(true);
    try {
      const res = await fetch(`${url}/user/get-users?activity=${activity}`);
      const data = await res.json();
      // console.log("DATAAARTA ->>", data);
      setDataUser(data);
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
      setError({ msg: "Ocurrio un error en bd" });
    }
  }

  if (load)
    return (
      <div className="loadContainer">
        <Loading />;
      </div>
    );
  if (error.msg)
    return (
      <ProviderAuth>
        <div className="main"> {error.msg}</div>;
      </ProviderAuth>
    );
  if (dataActivity.length !== 0)
    return (
      <ProviderAuth>
        <div className="main backg-1">
          <RenderList
            activity={activity}
            modalAdd={modalAdd}
            dataActivity={dataActivity}
            setModalAdd={setModalAdd}
            setLoad={setLoad}
            userData={dataUser}
            getDataAgain={getDataAgain}
          />
          <Notification
            activity={String(activity)}
            getDataAgain={getDataAgain}
          />
        </div>
      </ProviderAuth>
    );
}

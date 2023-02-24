import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonAdd from "../../../src/components/AddUser/ButtonAdd/ButtomAdd";
import AddUserForm from "../../../src/components/AddUser/Form/AddUserForm";
import Title from "../../../src/components/AddUser/Title/Title";
import Loading from "../../../src/components/Loading/Loading";
import RenderList from "../../../src/components/RenderList/RenderList";
import { url } from "../../../src/config/services-url";
import { typesActivity } from "../../../src/types/types-user";

export default function List() {
  const router = useRouter();
  console.log(router.query);
  const { activity } = router.query;

  // Estados de componente
  const [modalAdd, setModalAdd] = useState(false);
  const [load, setLoad] = useState(true);

  const [dataUser, setDataUser] = useState([]);
  const [dataActivity, setDataActivity] = useState([]);
  const [error, setError] = useState({ msg: "" });

  //Para obtener datos apenas ingresas a la pagina
  useEffect(() => {
    (async function () {
      try {
        const resUser = await fetch(
          `${url}/user/get-users?activity=${activity}`
        );
        const dataUser = await resUser.json();
        (await dataUser.length) === 0 &&
          setError({ msg: "No hay gente en la bd" });
        setDataUser(dataUser);
        setLoad(false);
        console.log(dataUser);
      } catch (err) {
        setLoad(false);
        setError({ msg: "Problemas con la bd" });
        console.log(err);
      }
    })();
  }, [activity]);

  useEffect(() => {
    (async function () {
      try {
        const resUser = await fetch(
          `${url}/activity/get-activity?activity=${activity}`
        );
        const dataAct = await resUser.json();
        (await dataAct.length) === 0 &&
          setError({ msg: "No hay gente en la bd" });
        setDataActivity(dataAct);
        setLoad(false);
        console.log(dataUser);
      } catch (err) {
        setLoad(false);
        setError({ msg: "Problemas con la bd" });
        console.log(err);
      }
    })();
  }, []);

  async function getDataAgain() {
    setLoad(true);
    try {
      const res = await fetch(`${url}/user/get-users?activity=${activity}`);
      const data = await res.json();
      console.log("DATAAARTA ->>", data);
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
  if (error.msg) return <div className="main"> {error.msg}</div>;
  return (
    <div className="main">
      <Title activityName={"Hola"} />
      {!load && <ButtonAdd setModalAdd={setModalAdd} color={"Gimnasio"} />}
      {dataActivity && modalAdd && (
        <AddUserForm
          dataActivity={dataActivity}
          // modalityOptions={modalityOptions} // Opciones para elegir a la hora de hacer el add -> es un array
          // activity={activityMain} // Es un objecto que va a ir en el modelo User.activity
          // setActivity={setactivityMain} //  Es para modificar el objecto que va a ir cuando se cree el usuario
          setModalAdd={setModalAdd} // Para cerrar la ventana cuando el usuario se cree
          getDataAgain={getDataAgain} // Cuando el usuario se cree vuelve a llamar a la bd
        />
      )}
      <RenderList
          setLoad={setLoad}
          userData={dataUser}
          getDataAgain={getDataAgain}
        />
    </div>
  );
}

import { useState, useEffect } from "react";
import AddUserForm from "../../src/components/AddUser/Form/AddUserForm";
import RenderList from "../../src/components/RenderList/RenderList";
import ButtonAdd from "../../src/components/AddUser/ButtonAdd/ButtomAdd";
import Title from "../../src/components/AddUser/Title/Title";
import { url } from "../../src/config/services-url";
import Loading from "../../src/components/Loading/Loading";

export default function KickBoxing() {
  /////////////// BORRAR ///////////////
  // console.log("Desde el back : ", props);
  // console.log("URL env : ", process.env.NEXT_PUBLIC_DOMAIN_BACK);
  //////////////////////////////////////

  const [modalAdd, setModalAdd] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [dataActivity, setDataActivity] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState({ msg: "" });
  //////// Funcion volver a llamadar data ////////

  async function getDataAgain() {
    setLoad(true);

    try {
      const res = await fetch(`${url}/user/get-users?activity=Kick Boxing`);
      const data = await res.json();
      console.log("DATAAARTA ->>", data);
      setDataUser(data);
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }

  ////////// useEffect //////////

  useEffect(() => {
    (async function () {
      try {
        const resUser = await fetch(
          `${url}/user/get-users?activity=Kick Boxing`
        );
        const resAct = await fetch(
          `${url}/activity/get-activity?activity=Kick Boxing`
        );
        const dataUser = await resUser.json();
        const dataAct = await resAct.json();
        setDataUser(dataUser);
        setDataActivity(dataAct);
        setLoad(false);
      } catch (err) {
        console.log(err);
        setError({ msg: "Ocurrio un error en bd" });
        setLoad(false);
      }
    })();
  }, []);

  //////////////////////////////
  ////////////////////////////////////////////

  if (error.msg) return <> Error en la BD {error.msg}</>;

  return (
    <div className={`main backg backg-kick-boxing`}>
      <Title activityName={"Kick Boxing"} />
      <ButtonAdd setModalAdd={setModalAdd} color={"Kick Boxing"} />
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
      {load ? (
        <Loading />
      ) : (
        <RenderList userData={dataUser} getDataAgain={getDataAgain} />
      )}{" "}
    </div>
  );
}

// export async function getStaticProps() {
//   try {
//     const resUser = await fetch(`${url}/user/get-users?activity=Kick Boxing`);
//     const resAct = await fetch(`${url}/activity/get-activity?activity=Kick Boxing`);
//     const dataAct = await resAct.json();
//     const dataUser = await resUser.json();
//     return {
//       props: {
//         dataUser,
//         dataAct,
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         dataUser: false,
//         dataAct: false,
//         // error: err,
//       },
//     };
//   }
// }

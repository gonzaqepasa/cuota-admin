import { useState, useEffect } from "react";
import AddUserForm from "../../src/components/AddUser/Form/AddUserForm";
import RenderList from "../../src/components/RenderList/RenderList";
import ButtonAdd from "../../src/components/AddUser/ButtonAdd/ButtomAdd";
import Title from "../../src/components/AddUser/Title/Title";
import { url } from "../../src/config/services-url";

export default function PowerBox(props: any) {
  /////////////// BORRAR ///////////////
  console.log("Desde el back : ", props);
  // console.log("URL env : ", process.env.NEXT_PUBLIC_DOMAIN_BACK);
  //////////////////////////////////////

  const [modalAdd, setModalAdd] = useState(false);
  const [dataUser, setDataUser] = useState(props.dataUser);
  const [dataActivity, setDataActivity] = useState(props.dataAct);
  //////// Funcion volver a llamadar data ////////

  async function getDataAgain() {
    try {
      const res = await fetch(`${url}/get-users?activity=Power Box`);
      const data = await res.json();
      console.log("DATAAARTA ->>", data);
      setDataUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  ////////////////////////////////////////////
  if (props.dataAct == false) {
    return (
      <div className={`main backg backg-power-box`}>
        Problemas en la base de datos{" "}
      </div>
    );
  }
  return (
    <div className={`main backg backg-power-box`}>
      <Title activityName={"Power Box"} />
      <ButtonAdd setModalAdd={setModalAdd} color={"Power Box"} />
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
      (
      <RenderList userData={dataUser} getDataAgain={getDataAgain} />)
    </div>
  );
}

export async function getStaticProps() {
  try {
    const resUser = await fetch(`${url}/get-users?activity=Power Box`);
    const resAct = await fetch(`${url}/get-activity?activity=Power Box`);
    const dataAct = await resAct.json();
    const dataUser = await resUser.json();
    return {
      props: {
        dataUser,
        dataAct,
      },
    };
  } catch (err) {
    return {
      props: {
        dataUser: false,
        dataAct: false,
        // error: err,
      },
    };
  }
}

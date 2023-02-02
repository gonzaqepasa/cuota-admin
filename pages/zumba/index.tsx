import { useState, useEffect } from "react";
import AddUserForm from "../../src/components/AddUser/Form/AddUserForm";
import RenderList from "../../src/components/RenderList/RenderList";
import ButtonAdd from "../../src/components/AddUser/ButtonAdd/ButtomAdd";
import Title from "../../src/components/AddUser/Title/Title";

export default function Zumba(props: any) {
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
      const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
      const res = await fetch(`http://${url}/user?activity=Zumba`);
      const data = await res.json();
      console.log("DATAAARTA ->>", data);
      setDataUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  ////////////////////////////////////////////
  if (!props.dataUser || !props.dataAct) {
    return <div className={`main main backg backg-zumba`}>Problemas en la base de datos </div>;
  }
  return (
    <div className={`main backg backg-zumba`}>
      <Title activityName={"Zumba"} />

      <ButtonAdd
        setModalAdd={setModalAdd}
        color={dataUser[0].activity.nameActivity}
      />
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
      {dataUser && (
        <RenderList userData={dataUser} getDataAgain={getDataAgain} />
      )}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
    const resUser = await fetch(`http://${url}/user?activity=Zumba`);
    const resAct = await fetch(`http://${url}/activity?activity=Zumba`);
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
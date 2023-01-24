import { useState, useEffect } from "react";
import AddUserForm from "../../src/components/AddUser/Form/AddUserForm";
import RenderList from "../../src/components/RenderList/RenderList";
import ButtonAdd from "../../src/components/AddUser/ButtonAdd/ButtomAdd";

export interface typesActivityRitmoKids {
  id: number;
  nameActivity: "Funcional";
  modality: "2 Días" | "3 Días" | "Libre";
}

export default function RitmoKids(props: any) {
  /////////////// BORRAR ///////////////
  console.log("Desde el back : ", props);
  // console.log("URL env : ", process.env.NEXT_PUBLIC_DOMAIN_BACK);
  //////////////////////////////////////
  //////// Informacion de sección Gym ////////
  //   const modalityOptions = ["3 Días", "2 Días", "Libre"];

  ////////////////////////////////////////////
  const [modalAdd, setModalAdd] = useState(false);
  const [dataUser, setDataUser] = useState(props.dataUser);
  const [dataActivity, setDataActivity] = useState(props.dataAct);
  //////// Funcion volver a llamadar data ////////

  async function getDataAgain() {
    try {
      const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
      const res = await fetch(`http://${url}/user?activity=Ritmo Kids`);
      const data = await res.json();
      console.log("DATAAARTA ->>", data);
      setDataUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  ////////////////////////////////////////////

  return (
    <div className={`main background-ritmo-kids`}>
      <ButtonAdd setModalAdd={setModalAdd} />
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
      {dataUser && <RenderList userData={dataUser} />}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const url = process.env.NEXT_PUBLIC_DOMAIN_BACK || "localhost:3001";
    const resUser = await fetch(`http://${url}/user?activity=Ritmo Kids`);
    const resAct = await fetch(`http://${url}/activity?activity=Ritmo Kids`);
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

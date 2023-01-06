import { useState } from "react";
import AddUserForm from "../../src/components/AddUser/Form/AddUserForm";
import Layout from "../../src/components/LayoutApp/LayoutApp";
import RenderList from "../../src/components/RenderList/RenderList";
import { typesUser } from "../../src/types/types-user";
import ButtonAdd from "../../src/components/AddUser/ButtonAdd/ButtomAdd";
import {
  collection,
  doc,
  query,
  setDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export interface typesActivityGym {
  name: "Funcional";
  modality: "2 Días" | "3 Días" | "Libre";
}

export default function Gym(props: any) {
  /////////////// BORRAR ///////////////
  // console.log('Desde EL back : ', props)
  // console.log('Desde EL back : ', process.env.FIREBASE_DOMAIN_UNO)

  //////////////////////////////////////
  //////// Informacion de sección Gym ////////
  const modalityOptions = ["3 Días", "2 Días", "Libre"];
  const [activityMain, setactivityMain] = useState<typesActivityGym>({
    name: "Funcional",
    modality: "3 Días",
  });
  ////////////////////////////////////////////
  const [modalAdd, setModalAdd] = useState(false);
  const [dataUser, setDataUser] = useState(props.data);
  //////// Funcion volver a llamadar data ////////
  async function getDataAgain() {
    try {
      // const { data }: any = await axios.get(
      //   "http://localhost:3000/api/gym/get-users"
      // );
      // const url = process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000";
      // const res = await fetch(`http://${url}/api/gym/get-users`);
      // const data = await res.json();
      const data = await getAux();
      console.log("DATAAARTA ->>", data);
      setDataUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  ////////////////////////////////////////////

  return (
    <div className={`main`}>
      <ButtonAdd setModalAdd={setModalAdd} />
      {modalAdd && (
        <AddUserForm
          modalityOptions={modalityOptions} // Opciones para elegir a la hora de hacer el add -> es un array
          activity={activityMain} // Es un objecto que va a ir en el modelo User.activity
          setActivity={setactivityMain} //  Es para modificar el objecto que va a ir cuando se cree el usuario
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
    // const { data }: any = await axios.get(`http://${url}/api/gym/get-users`);
    const res = await fetch(`http://${url}/user/get-funcional`);
    const data = await res.json();
    // const toSend = await getAux();
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        data: false,
        error: err,
      },
    };
  }
}

async function getAux() {
  try {
    const querySnapshot = await getDocs(collection(db, "User"));
    const toSend: object[] = [];
    querySnapshot.forEach((doc) => {
      const { name, phone, age, email, dni, installments, active, activity } =
        doc.data();
      if (doc.data().activity.name === "Funcional") {
        toSend.push({
          name,
          phone,
          email,
          dni,
          installments,
          active,
          activity,
          id: doc.id,
        });
      }
    });
    return toSend;
  } catch (err) {
    console.log(err);
  }
}

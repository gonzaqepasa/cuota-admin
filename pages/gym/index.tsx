import { useState } from "react";
import AddUserForm from "../../src/components/AddUser/Form/AddUserForm";
import Layout from "../../src/components/LayoutApp/LayoutApp";
import RenderList from "../../src/components/RenderList/RenderList";
import { typesUser } from "../../src/types/types-user";
import axios from "axios";
import ButtonAdd from "../../src/components/AddUser/ButtonAdd/ButtomAdd";

export interface typesActivityGym {
  name: "Funcional";
  modality: "2 Días" | "3 Días" | "Libre";
}

export default function Gym(props: any) {
  //////// Informacion de sección Gym ////////
  const modalityOptions = ["3 Días", "2 Días", "Libre"];
  const [activityMain, setactivityMain] = useState<typesActivityGym>({
    name: "Funcional",
    modality: "3 Días",
  });
  ////////////////////////////////////////////
  const [modalAdd, setModalAdd] = useState(false);
  //   console.log("esto es propr", props?.data);
  return (
    <div>
      <ButtonAdd setModalAdd={setModalAdd} />
      {modalAdd && (
        <AddUserForm
          modalityOptions={modalityOptions}
          activity={activityMain}
          setActivity={setactivityMain}
          setModalAdd={setModalAdd}
        />
      )}
      <RenderList userData={props.data} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const { data }: any = await axios.get(
      "http://localhost:3000/api/gym/get-users"
    );
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        data: false,
      },
    };
  }
}

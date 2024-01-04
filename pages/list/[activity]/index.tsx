import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonAdd } from "../../../src/components/AddUser/ButtonAdd/ButtomAdd";
import { AddUserForm } from "../../../src/components/AddUser/Form/AddUserForm";
import { Title } from "../../../src/components/RenderList/Title/Title";
import Loading from "../../../src/components/Loading/Loading";
import { RenderList } from "../../../src/components/RenderList/RenderList";
import { url } from "../../../src/config/env_d";
import { typesActivity, typesBusiness } from "../../../src/types/types-user";
import { Notification } from "../../../src/components/Notification/Notification";
import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks";
import { firstLetterUpper } from "../../../src/logic/firstLetterUpper";

export default function List() {
  const router = useRouter();
  const { activity } = router.query;
  // console.log(activity);

  // Estados de componente
  const [modalAdd, setModalAdd] = useState(false);
  const [load, setLoad] = useState(true);

  const [dataUser, setDataUser] = useState([]);
  const [dataActivity, setDataActivity] = useState();
  const [error, setError] = useState({ msg: "" });

  // const dispatch = useAppDispatch();
  const business: typesBusiness | null = useAppSelector((state) => state.value);
  const thisActivity = business?.activities.find((a) => a._id === activity);
  //Para obtener datos apenas ingresas a la pagina

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

  if (!business || error.msg.length !== 0)
    return (
      <div className="loadContainer">
        <Loading />;
      </div>
    );
  if (error.msg) return <div className="main"> {error.msg}</div>;

  return (
    <div className="main backg-1">
      <Title activityName={firstLetterUpper(String(thisActivity?.name))} activityModality={String(thisActivity?.modality)} />
      <RenderList
        activity={activity}
        modalAdd={modalAdd}
        dataActivity={thisActivity}
        setModalAdd={setModalAdd}
        setLoad={setLoad}
        businessData={business}
        getDataAgain={getDataAgain}
      />
      {/* <Notification activity={String(activity)} getDataAgain={getDataAgain} /> */}
    </div>
  );
}

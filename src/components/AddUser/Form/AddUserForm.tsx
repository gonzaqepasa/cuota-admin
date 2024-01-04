import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { validateFormInputs } from "../logic/validateAddInputs";
import { createUser } from "../../../logic/createUser";
import { typesActivity } from "../../../types/types-user";
import Loading from "../../Loading/Loading";
import { useRouter } from "next/router";
import { ModalityInput } from "./Modality/ModalityInput";
import { NameInput } from "./Name/NameInput";
import { DescriptionInput } from "./Description/DescriptionInput";
import { ButtonForm } from "./Button/ButtonForm";
import { ID_BUSINESS } from "../../../config/env_d";
import { useAppDispatch } from "../../../redux/hooks";
import { getBusinessFromApi } from "../../../logic/getBusiness";

interface Props {
  // setActivity: Dispatch<SetStateAction<typesActivityGym>>;
  setModalAdd: Dispatch<SetStateAction<boolean>>;
  // modalityOptions: string[];

  dataActivity?: typesActivity[];
}

export const AddUserForm: React.FC<Props> = ({
  // modalityOptions,
  // activity,
  // setActivity,
  setModalAdd,

  dataActivity,
}) => {
  const [load, setLoad] = useState(false);
  const route = useRouter();
  const dispatch = useAppDispatch();
  const getDataAgain = async () => {
    const data = await getBusinessFromApi();
    dispatch(data);
  };
  //////////////// Estados de los inputs ////////////////
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState(0);
  const [activity, setActivity] = useState(dataActivity[0]._id);
  const [description, setDescription] = useState("");
  ///////////////////////////////////////////////////////

  //////////////// Estados para validar inputs ////////////////
  const [nameVal, setNameVal] = useState({
    val: false,
    msg: "",
  });

  ////////////////////////////////////////////////////////////
  const toSendObj: {
    name: string;
    description: string;
    id_activity: string;
    id_business: string;
    email: string;
    username: string;
    phoneNumber: string;
  } = {
    name,
    description,
    id_activity: activity,
    id_business: ID_BUSINESS,
    email: "",
    username: "",
    phoneNumber: "",
  };
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    validateFormInputs(name, setNameVal) &&
      createUser({
        objData: toSendObj,
        nameUser: name,
        setModalAdd,
        getDataAgain,
        dataActivity,
        setLoad,
        cb: ({ id }) => route.push(`/user/${id}`),
      });
  }
  if (load)
    return (
      <div className={"max-w-md w-5/6 py-5 "}>
        <Loading size={30} />;
      </div>
    );

  return (
    <div
      // onClick={() => setModalAdd(false)}
      // className={`${styles.allAddUserForm}`}
      className="max-w-md w-5/6 animate-one "
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <ModalityInput setActivity={setActivity} dataActivity={dataActivity} />

        <NameInput
          setName={setName}
          dataActivity={dataActivity}
          nameVal={nameVal}
        />
        <DescriptionInput
          dataActivity={dataActivity}
          setDescription={setDescription}
        />
        <ButtonForm setModalAdd={setModalAdd} />
      </form>
    </div>
  );
};

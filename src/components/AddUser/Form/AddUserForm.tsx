import { FormEvent, useState } from "react";
import { validateFormInputs } from "../logic/validateAddInputs";
import { createUser } from "../../../api-next/createUser";
import { typesActivity } from "../../../types/types-user";
import Loading from "../../Loading/Loading";
import { useRouter } from "next/navigation";
import { ModalityInput } from "./Modality/ModalityInput";
import { NameInput } from "./Name/NameInput";
import { DescriptionInput } from "./Description/DescriptionInput";
import { ButtonForm } from "./Button/ButtonForm";

interface Props {
  dataActivity: typesActivity[];
  onClose: () => void;
}

export const AddUserForm: React.FC<Props> = ({ dataActivity, onClose }) => {
  const [load, setLoad] = useState(false);
  const route = useRouter();
  //////////////// Estados de los inputs ////////////////
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState(0);
  const [activity, setActivity] = useState(dataActivity[0].id);
  const [description, setDescription] = useState("");
  ///////////////////////////////////////////////////////

  //////////////// Estados para validar inputs ////////////////
  const [nameVal, setNameVal] = useState({
    val: false,
    msg: "",
  });

  ////////////////////////////////////////////////////////////
  const toSendObj: { name: string; description: string; activityId: number } = {
    name,
    description,
    activityId: activity,
  };
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    validateFormInputs(name, setNameVal) &&
      createUser({
        objData: toSendObj,
        nameUser: name,
        dataActivity,
        setLoad,
        cb: ({ id }) => route.push(`/user/${id}`),
      });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
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
      <ButtonForm onClose={onClose} isLoad={load} />
    </form>
  );
};

import { FormEvent, useState } from "react";
import { validateFormInputs } from "../logic/validateAddInputs";
import { createUser } from "../../../api-next/createUser";
import { typesActivity, typesUser } from "../../../types/types-user";
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
  const [activity, setActivity] = useState<number | null>(null);
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
    activityId: number | null;
  } = {
    name,
    description,
    activityId: activity,
  };
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);

    createUser({
      objData: toSendObj,
      nameUser: name,
      dataActivity,
      setLoad,
      router: route,
    });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
      <ModalityInput
        setActivity={setActivity}
        dataActivity={dataActivity}
        activity={activity}
      />

      <NameInput
        setName={setName}
        dataActivity={dataActivity}
        nameVal={nameVal}
      />
      <DescriptionInput
        dataActivity={dataActivity}
        setDescription={setDescription}
      />
      <ButtonForm
        onClose={onClose}
        isLoad={load}
        name={name}
        activity={activity}
      />
    </form>
  );
};

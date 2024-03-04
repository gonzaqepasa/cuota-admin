import { FormEvent, useState } from "react";
import { validateFormInputs } from "../logic/validateAddInputs";
import { createUser } from "../../../api-next/user/createUser";
import { typesActivity, typesUser } from "../../../types/types-user";
import { useRouter } from "next/navigation";
import { ModalityInput } from "./Modality/ModalityInput";
import { NameInput } from "./Name/NameInput";
import { DescriptionInput } from "./Description/DescriptionInput";
import { ButtonForm } from "./Button/ButtonForm";
import Link from "next/link";

interface Props {
  dataActivity: typesActivity[];
  userData?: typesUser[];
  onClose: () => void;
}

export const AddUserForm: React.FC<Props> = ({
  dataActivity,
  onClose,
  userData,
}) => {
  const [load, setLoad] = useState(false);
  const route = useRouter();
  //////////////// Estados de los inputs ////////////////
  const [name, setName] = useState("");
  const [activity, setActivity] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  ///////////////////////////////////////////////////////

 

  ////////////////////////////////////////////////////////////
  const toSendObj: {
    name: string;
    description: string;
    activityId: string | null;
    phoneNumber?: string;
  } = {
    name,
    description,
    activityId: activity,
    phoneNumber,
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
        nameVal={name}
        userData={userData}
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

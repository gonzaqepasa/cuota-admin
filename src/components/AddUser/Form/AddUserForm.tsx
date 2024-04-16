import { FormEvent, useState } from "react";
import { validateFormInputs } from "../logic/validateAddInputs";
import { createUser } from "../../../api-next/user/createUser";
import { typesActivity, typesUser } from "../../../types/types-user";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ModalityInput } from "./Modality/ModalityInput";
import { NameInput } from "./Name/NameInput";
import { DescriptionInput } from "./Description/DescriptionInput";
import { ButtonForm } from "./Button/ButtonForm";
import Link from "next/link";
import { PhoneInput } from "./Phone/Phone";

interface Props {
  onClose: () => void;
}

export const AddUserForm: React.FC<Props> = ({ onClose }) => {
  const [load, setLoad] = useState(false);
  const route = useRouter();
  const params = useSearchParams();
  const search = params.get("search");
  //////////////// Estados de los inputs ////////////////
  const [name, setName] = useState(search || "");
  const [activity, setActivity] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  ///////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  const toSendObj: {
    name: string;
    description: string;

    phoneNumber?: string;
  } = {
    name,
    description,

    phoneNumber,
  };
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);

    createUser({
      objData: toSendObj,
      nameUser: name,
      setLoad,
      router: route,
    });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
      <NameInput setName={setName} nameVal={name} />
      <PhoneInput setPhone={setPhoneNumber} />
      <DescriptionInput setDescription={setDescription} />
      <ButtonForm
        onClose={onClose}
        isLoad={load}
        name={name}
        activity={activity}
      />
    </form>
  );
};

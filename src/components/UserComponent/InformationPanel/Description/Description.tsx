"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { editDescription } from "../../../../api-next/editDescription";
import Loading from "../../../Loading/Loading";
import { typesUser } from "../../../../types/types-user";
import ModalEditUser from "../ModalEditUser";
import { Textarea } from "@nextui-org/react";

interface Props {
  user: typesUser;
}

export const Description: React.FC<Props> = ({ user }) => {
  // Component...
  const [descript, setDescription] = useState(user.description || "");

  async function handleSubmit({
    newVal,
    onClose,
    setLoad,
  }: {
    newVal: string;
    onClose: () => void;
    setLoad: Dispatch<SetStateAction<boolean>>;
  }) {
    try {
      const res = await editDescription({
        id: String(user.id),
        newDescription: newVal,
      });
      setDescription(String(res));
      // onClose();
      setLoad(false);
    } catch (e) {
      setLoad(false);
    }
  }

  return (
    <div className={` flex first-letter:`}>
      <p className="hover:bg-none">{descript}</p>
      <ModalEditUser
        lenghtVal={0}
        defaultVal={descript}
        handle={handleSubmit}
        user={user}
        title={`Editar descripción`}
      />
    </div>
  );
};

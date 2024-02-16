"use client";
import { editDescription } from "../../../../api-next/editDescription";
import { typesUser } from "../../../../types/types-user";
import ModalEditUser from "../ModalEditUser";
import TextUserPanel from "../TextUserPanel";

interface Props {
  user: typesUser;
}

export const Description: React.FC<Props> = ({ user }) => {
  // Component...

  return (
    <div className={` flex justify-between`}>
      <TextUserPanel label="Descripción" val={user.description} />
      <ModalEditUser
        lenghtVal={0}
        defaultVal={user.description || ""}
        handle={editDescription}
        user={user}
        title={`Editar descripción`}
      />
    </div>
  );
};

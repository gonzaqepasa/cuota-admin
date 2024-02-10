"use client";
import { editDescription } from "../../../../api-next/editDescription";
import { typesUser } from "../../../../types/types-user";
import ModalEditUser from "../ModalEditUser";

interface Props {
  user: typesUser;
}

export const Description: React.FC<Props> = ({ user }) => {
  // Component...

  return (
    <div className={` flex first-letter:`}>
      <p className="hover:bg-none">{user.description}</p>
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

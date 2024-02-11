"use client";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { editName } from "../../../../api-next/editName";
import ModalEditUser from "../ModalEditUser";
import { typesUser } from "../../../../types/types-user";

interface Props {
  user: typesUser;
}

export const NameUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={` flex items-center justify-between   `}>
      <p>{firstLetterUpper(user.name)}</p>
      <ModalEditUser
        lenghtVal={2}
        defaultVal={user.name}
        handle={editName}
        user={user}
        title={`Editar nombre`}
      />
    </div>
  );
};

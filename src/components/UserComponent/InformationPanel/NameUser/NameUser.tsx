"use client";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { editName } from "../../../../api-next/user/editName";
import ModalEditUser from "../ModalEditUser";
import { typesUser } from "../../../../types/types-user";
import TextUserPanel from "../TextUserPanel";

interface Props {
  user: typesUser;
}

export const NameUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={` flex items-center justify-between   `}>
      <TextUserPanel label="Nombre" val={firstLetterUpper(user.name)} />
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

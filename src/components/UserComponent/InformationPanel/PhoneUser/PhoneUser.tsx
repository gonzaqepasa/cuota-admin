"use client";
import { typesUser } from "../../../../types/types-user";
import { editPhoneLogic } from "../../../../api-next/editPhone";
import ModalEditUser from "../ModalEditUser";
import TextUserPanel from "../TextUserPanel";

interface Props {
  user: typesUser;
}

export const PhoneUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={` flex items-center justify-between   `}>
      <TextUserPanel label="Numero de teléfono" val={user.phone} />
      <ModalEditUser
        lenghtVal={0}
        defaultVal={user.phone || ""}
        handle={editPhoneLogic}
        user={user}
        title={`Editar numero de teléfono`}
      />
    </div>
  );
};

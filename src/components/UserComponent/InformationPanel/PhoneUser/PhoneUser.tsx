"use client";
import { typesUser } from "../../../../types/types-user";
import { editPhoneLogic } from "../../../../api-next/user/editPhone";
import ModalEditUser from "../ModalEditUser";
import TextUserPanel from "../TextUserPanel";
import { FaWhatsapp } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import ButtonSendWpp from "./ButtonSendWpp";

interface Props {
  user: typesUser;
}

export const PhoneUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={`card-effect-1 flex items-center justify-between   `}>
      <TextUserPanel label="Numero de teléfono" val={user.phoneNumber} />

      <div className="flex items-center ">
        <ButtonSendWpp user={user} />
        <ModalEditUser
          lenghtVal={0}
          defaultVal={user.phoneNumber || ""}
          handle={editPhoneLogic}
          user={user}
          title={`Editar numero de teléfono`}
        />
      </div>
    </div>
  );
};

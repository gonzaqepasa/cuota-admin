"use client";
import { typesUser } from "../../../../types/types-user";
import { editPhoneLogic } from "../../../../api-next/editPhone";
import ModalEditUser from "../ModalEditUser";
import TextUserPanel from "../TextUserPanel";
import { FaWhatsapp } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";

interface Props {
  user: typesUser;
}

export const PhoneUser: React.FC<Props> = ({ user }) => {
  return (
    <div className={` flex items-center justify-between   `}>
      <TextUserPanel label="Numero de teléfono" val={user.phone} />

      <div className="flex items-center ">
        {user.phone && (
          <>
            <Tooltip
              color="success"
              delay={600}
              content="Enviar enlace para ver el pago de sus cuotas"
            >
              <a
                className="rounded-xl p-3 text-green-600 hover:bg-green-500/20"
                target="_blank"
                href={`https://wa.me/+54${
                  user.phone
                }?text=¡Hola ${firstLetterUpper(
                  user.name
                )}, este es el enlace para que puedas consultar el estado de tus pagos https://indomitotraining.com/pagos/${
                  user.id
                }`}
              >
                <FaWhatsapp />
              </a>
            </Tooltip>
          </>
        )}
        <ModalEditUser
          lenghtVal={0}
          defaultVal={user.phone || ""}
          handle={editPhoneLogic}
          user={user}
          title={`Editar numero de teléfono`}
        />
      </div>
    </div>
  );
};

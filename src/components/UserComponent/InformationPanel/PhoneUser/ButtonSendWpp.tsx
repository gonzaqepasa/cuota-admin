import { Tooltip } from "@nextui-org/react";
import { typesUser } from "../../../../types/types-user";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface Props {
  user: typesUser;
}
const ButtonSendWpp: React.FC<Props> = ({ user }) => {
  return (
    <>
      {user.phoneNumber && (
        <>
          <Tooltip
            color="success"
            delay={600}
            content="Enviar enlace para ver el pago de sus cuotas"
          >
            <Link            
              className="rounded-xl p-3 text-green-600 hover:bg-green-500/20 text-base"
              target="_blank"
              href={`https://wa.me/+54${
                user.phoneNumber
              }?text=¡Hola ${firstLetterUpper(
                user.name
              )}, este es el enlace para que puedas consultar el estado de tus pagos https://indomitotraining.com/cliente/${
                user._id
              }`}
            >
              <FaWhatsapp />
            </Link>
          </Tooltip>
        </>
      )}
    </>
  );
};

export default ButtonSendWpp;

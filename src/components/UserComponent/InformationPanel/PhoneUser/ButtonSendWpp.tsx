import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { typesUser } from "../../../../types/types-user";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";
import { FaExternalLinkAlt, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface Props {
  user: typesUser;
}
const ButtonSendWpp: React.FC<Props> = ({ user }) => {
  return (
    <>
      {user.phoneNumber && (
        <>
          <Dropdown
          // color="success"
          // delay={600}
          // content="Enviar enlace para ver el pago de sus cuotas"
          >
            <DropdownTrigger>
              <Button
                variant="light"
                color="success"
                className="rounded-xl p-3 min-w-fit text-green-600 hover:bg-green-500/20 text-base"
              >
                <FaWhatsapp />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              className="dark bg-content1-100"
            >
              <DropdownItem
                key="send"
                color="success"
                endContent={<FaExternalLinkAlt />}
                className="text-success-200"
              >
                <Link
                  target="_blank"
                  href={`https://wa.me/+54${
                    user.phoneNumber
                  }?text=¡Hola ${firstLetterUpper(
                    user.name
                  )}, este es el enlace para que puedas consultar el estado de tus pagos https://indomitotraining.com/cliente/${
                    user._id
                  }`}
                >
                  Enviar enlace
                </Link>
              </DropdownItem>
              <DropdownItem
                key="open"
                color="success"
                endContent={<FaExternalLinkAlt />}
              >
                <Link
                  target="_blank"
                  href={`https://wa.me/+54${user.phoneNumber}`}
                >
                  Abrir WhatsApp
                </Link>
              </DropdownItem>
              <DropdownItem
                key="open"
                color="primary"
                endContent={<FaExternalLinkAlt />}
              >
                <Link target="_blank" href={`/cliente/${user._id}`}>
                  Ver cliente
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
    </>
  );
};

export default ButtonSendWpp;

import { payMonth } from "../../../../../api-next/payMonth";
import { MdAdd } from "react-icons/md";
import mp from "../../../../../styles/mp.png";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { typesMonth, typesUser } from "../../../../../types/types-user";
import { firstLetterUpper } from "../../../../../logic/firstLetterUpper";
import { FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  el: typesMonth;
  userData: typesUser;
}

export const ButtonPay: React.FC<Props> = ({ el, userData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const handleSubmit = async ({
    method,
    onClose,
  }: {
    method: "MP" | "EF";
    onClose: () => void;
  }) => {
    try {
      setLoad(true);
      await payMonth({ month: el, userData, method });
      setLoad(false);
      onClose();
      router.refresh();
    } catch (e) {
      setLoad(false);
      console.log(e);
    }
  };

  return (
    <>
      <Button
        variant="shadow"
        color="success"
        className="absolute bottom-1 right-1"
        onPress={onOpen}
      >
        {" "}
        <MdAdd className="text-xl text-green-800" />
        Pagar mes
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-base gap-1">
                PAGO DE MES
              </ModalHeader>
              <ModalBody>
                <p className="text-neutral-900 text-sm">
                  ¿{firstLetterUpper(userData.name)}{" "}
                  <i className="text-neutral-500">va a pagar el mes de</i>{" "}
                  {el.monthName} ?
                </p>
                <p className="text-sm">
                  {`Selecciona el método de pago`}{" "}
                  <i className="text-green-600">{`Efectivo`}</i>
                  {" o "}
                  <i className="text-blue-600">{`MercadoPago`}</i>
                </p>
              </ModalBody>
              <ModalFooter className="flex flex-col lg:flex-row">
                <Button
                  color="danger"
                  variant="light"
                  isDisabled={load}
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color="success"
                  variant="bordered"
                  onPress={() => handleSubmit({ method: "EF", onClose })}
                  isLoading={load}
                  isDisabled={load}
                >
                  <FaMoneyBillWave
                    className="mx-1 col-green-succes "
                    size={20}
                  />
                  Efectivo
                </Button>
                <Button
                  color="primary"
                  variant="bordered"
                  onPress={() => handleSubmit({ method: "MP", onClose })}
                  isLoading={load}
                  isDisabled={load}
                >
                  <Image
                    src={mp}
                    height={22}
                    className="mx-1 "
                    alt="no se encontr imagen"
                  />
                  MercadoPago
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

import { useState } from "react";

import { type typesMonth } from "../../../../../types/types-user";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { payCancel } from "../../../../../api-next/month/payCancel";

interface Props {
  el: typesMonth;
}

export const ButtonCancel: React.FC<Props> = ({ el }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const handleSubmit = async (onClose: () => void) => {
    try {
      setLoad(true);
      await payCancel({
        id: el._id,
        monthName: el.monthName,
      });
      setLoad(false);
      onClose();
      router.refresh();
    } catch (e) {
      console.log(e);
      setLoad(false);
    }
  };
  return (
    <>
      <Button
        className="absolute bottom-1 right-1"
        variant="light"
        color="danger"
        onPress={onOpen}
      >
        Cancelar pago
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-base">
                CANCELAR PAGO
              </ModalHeader>
              <ModalBody>
                <p className="text-sm">
                  ¿Estas seguro que quieres cancelar este pago?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isDisabled={load}
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  isLoading={load}
                  isDisabled={load}
                  onPress={() => handleSubmit(onClose)}
                >
                  Cancelar pago
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

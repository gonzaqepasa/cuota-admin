import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  user,
  Tooltip,
} from "@nextui-org/react";
import { typesUser } from "../../../types/types-user";
import { deleteUserLogic } from "../../../api-next/user/deleteUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";

interface Props {
  userData: typesUser;
  text?: string;
}
const ButtonDeleteUser: React.FC<Props> = ({ userData, text }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [load, setLoad] = useState(false);
  const route = useRouter();
  console.log(userData);
  const handleDelete = async (onClose: () => void) => {
    try {
      setLoad(true);
      await deleteUserLogic({
        id: userData._id,
        cb: () => route.refresh(),
      });
      setLoad(false);
      onClose();
    } catch (err) {
      setLoad(false);
    }
  };

  return (
    <>
      <Tooltip
        color="danger"
        delay={1000}
        content={`¿Quieres eliminar a ${firstLetterUpper(userData.name)}?`}
      >
        <Button
          onPress={onOpen}
          variant="light"
          color="danger"
          className="w-10 h-10 min-w-fit text-lg p-0"
        >
          <MdDelete />
          {text}
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {` Eliminar a ${userData.name.toUpperCase()} `}
              </ModalHeader>
              <ModalBody>
                <p>{`Su actividad es ${userData.activity.nameActivity} ${userData.activity.modality}`}</p>
                <p>{`Se perdera la información relacionada *`}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={load}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  isDisabled={load}
                  isLoading={load}
                  onPress={() => handleDelete(onClose)}
                >
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonDeleteUser;

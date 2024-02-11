"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { typesUser } from "../../../types/types-user";
import { useRouter } from "next/navigation";

export interface typesHanldeEditUser {
  id: string;
  newVal: string;
  onClose?: () => void;
}

interface Props {
  defaultVal: string;
  title: string;
  handle: ({ newVal, id, onClose }: typesHanldeEditUser) => void;
  user: typesUser;
  lenghtVal: number;
}
const ModalEditUser: React.FC<Props> = ({
  defaultVal,
  handle,
  user,
  title,
  lenghtVal,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [val, setVal] = useState(defaultVal);
  const [load, setLoad] = useState(false);
  const router = useRouter();
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setVal(e.target.value);
  }

  const handleSubmit = (onClose: () => void) => {
    try {
      setLoad(true);
      handle({ newVal: val, id: String(user.id), onClose });
      router.refresh();

      setLoad(false);
    } catch (e) {
      setLoad(false);
      console.log(e);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        color="primary"
        className="min-w-0 w-10 h-10 p-0 text-lg"
      >
        <CiEdit />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Input
                  variant="bordered"
                  color="primary"
                  value={val}
                  onChange={(e) => handleChange(e)}
                />
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
                  color="primary"
                  isDisabled={
                    val.toLowerCase() === defaultVal.toLowerCase() ||
                    val.length < lenghtVal ||
                    load
                  }
                  isLoading={load}
                  onPress={() => handleSubmit(onClose)}
                >
                  Cambiar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditUser;

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
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { typesUser } from "../../../types/types-user";

interface Props {
  defaultVal: string;
  title: string;
  handle: ({
    newVal,
    onClose,
    setLoad,
  }: {
    newVal: string;
    onClose: () => void;
    setLoad: Dispatch<SetStateAction<boolean>>;
  }) => void;
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

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setVal(e.target.value);
  }

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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => setVal(defaultVal)}
      >
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
                    val.toLowerCase() === user.name.toLowerCase() ||
                    val.length < lenghtVal ||
                    load
                  }
                  isLoading={load}
                  onPress={() => handle({ newVal: val, onClose, setLoad })}
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

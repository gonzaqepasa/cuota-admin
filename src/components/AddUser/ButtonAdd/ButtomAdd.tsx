"use client";

import { IoPersonAdd } from "react-icons/io5";

import { selectColor } from "../../../logic/selectColor";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { AddUserForm } from "../Form/AddUserForm";
interface Props {}

export const ButtonAdd: React.FC<Props> = ({}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip
        content={`¡Click aca para agregar un cliente a esta actividad!`}
        color="primary"
        delay={1000}
      >
        <Button color="primary" variant="shadow" onPress={onOpen}>
          <IoPersonAdd />
          {`agregar cliente`}
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center ">
                {`AGREGAR CLIENTE`}
              </ModalHeader>
              <ModalBody>
                <AddUserForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

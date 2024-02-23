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
import { NameInput } from "../Form/Name/NameInput";
import { AddUserForm } from "../Form/AddUserForm";
import { typesActivity } from "../../../types/types-user";
interface Props {
  color: string;
  dataActivity: typesActivity[];
}

export const ButtonAdd: React.FC<Props> = ({ color, dataActivity }) => {
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
                {`AGREGAR CLIENTE A ${dataActivity[0].nameActivity.toUpperCase()}`}
              </ModalHeader>
              <ModalBody>
                <AddUserForm dataActivity={dataActivity} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

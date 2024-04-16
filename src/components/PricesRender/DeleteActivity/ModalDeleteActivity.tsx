"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
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
import { deleteActivityClient } from "../../../api-next/activity/deleteActivity";
import { typesActivity } from "../../../types/types-user";

interface Props {
  data: typesActivity;
}
const ModalDeleteActivity: React.FC<Props> = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [load, setLoad] = useState(false);
  const router = useRouter();
  const handleSubmit = async (onClose: () => void) => {
    setLoad(true);
    try {
      await deleteActivityClient({ _id: data._id, data });
      setLoad(false);
      router.refresh();
      onClose();
    } catch (e) {
      setLoad(false);
      console.log(e);
    }
  };

  return (
    <>
      <Button
        color="danger"
        variant="light"
        className="min-w-fit text-lg "
        onPress={onOpen}
      >
        <MdDelete />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isDisabled={load}
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={load}
                  isLoading={load}
                  onPress={() => handleSubmit(onClose)}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalDeleteActivity;

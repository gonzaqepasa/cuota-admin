'use client'
import React, { useState } from "react";
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
import { createActivity } from "../../../api-next/createActivity";
import { useRouter } from "next/navigation";

export default function ModalCreateActivity() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nameActivity, setNameActivity] = useState("");
  const [modality, setModality] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const handleSubmit = async (onClose: () => void) => {
    setLoad(true);
    try {
      await createActivity({ color, modality, nameActivity, price, id: 0 });
      setLoad(false);
      onClose();
      router.push(`/dashboard/${nameActivity}`);
    } catch (e) {
      setLoad(false);
      console.log(e);
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    type="text"
                    onChange={(e) => setNameActivity(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    onChange={(e) => setModality(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Input
                    type="color"
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </ModalBody>
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
                  onPress={()=>handleSubmit(onClose)}
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
}

"use client";
import { typesActivity } from "../../../types/types-user";
import { useState, Dispatch, SetStateAction } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { selectColor } from "../../../logic/selectColor";
import { numberToMoney } from "../../../logic/numberToMoney";
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

import { useRouter } from "next/navigation";
import { editColor } from "../../../api-next/editColor";

interface Props {
  data: typesActivity;
}

export const EditColorActivity: React.FC<Props> = ({ data }) => {
  const [newColor, setNewColor] = useState(data.color);
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleChange(c: string) {
    setNewColor(c);
  }

  const handleSubmit = async (onClose: () => void) => {
    try {
      setLoad(true);
      //   await editPrice({ ...data, price: newPrice });
      await editColor({ ...data, color: newColor });
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
        style={{ color: selectColor(data.nameActivity) }}
        variant="light"
        onPress={onOpen}
      >
        Cambiar color
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                EDITAR PRECIO
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    defaultValue={data.color}
                    onChange={(e) => handleChange(e.target.value)}
                    type="color"
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
                  Cancelar
                </Button>
                <Button
                  isDisabled={load || data.color === newColor}
                  isLoading={load}
                  color="primary"
                  onPress={() => handleSubmit(onClose)}
                >
                  Cambiar precio
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

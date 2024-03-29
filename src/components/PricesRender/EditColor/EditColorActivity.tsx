"use client";
import { typesActivity } from "../../../types/types-user";
import { useState } from "react";

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
import { IoIosColorPalette } from "react-icons/io";

import { useRouter } from "next/navigation";
import { editColor } from "../../../api-next/activity/editColor";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";

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
        style={{ color: data.color }}
        className={`min-w-0`}
        variant="light"
        onPress={onOpen}
      >
        <IoIosColorPalette />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                EDITAR COLOR
              </ModalHeader>
              <ModalBody>
                <div className="flex text-sm flex-col items-center gap-2">
                  <p>{`Selecciones un nuevo color para la actividad ${firstLetterUpper(
                    data.nameActivity
                  )}`}</p>
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

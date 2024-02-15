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

import { editPrice } from "../../../api-next/editPrice";
import { useRouter } from "next/navigation";

interface Props {
  data: typesActivity;
}

export const EditPriceModal: React.FC<Props> = ({ data }) => {
  const [newPrice, setNewPrice] = useState(data.price);
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handlePriceChange(n: number) {
    console.log(n);
    setNewPrice(n);
  }

  const handleSubmit = async (onClose: () => void) => {
    try {
      if (newPrice < 0) return alert("El precio no puede ser menor a 0");
      if (newPrice > 100000)
        return alert("El precio no puede ser mayor a 100.000");
      setLoad(true);
      await editPrice({ ...data, price: newPrice });
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
        variant="light"
        onPress={onOpen}
      >
        Editar precio
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
                  <div className="flex flex-col items-center">
                    <p className="text-sm">{`Seleccione el precio para la actividad`}</p>
                    <p className=" font-semibold">{data.nameActivity}</p>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: selectColor(data.nameActivity) }}
                    >
                      {data.modality}
                    </p>
                    <p className="text-sm italic">{`El precio debe ser mayor a $0 y menor a $100.000`}</p>
                  </div>
                </div>
                <div>
                  <Input
                    min={0}
                    max={100000}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small px-1">
                          $
                        </span>
                      </div>
                    }
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    defaultValue={String(data.price)}
                    type="number"
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
                  isDisabled={load || data.price === newPrice}
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

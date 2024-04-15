"use client";
import { MdAdd } from "react-icons/md";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllActivitiesToDashboard } from "../../../api-next/activity/getActivity";

interface Props {
  //   month: {
  //     name: string;
  //     num: number;
  //   };
  //   userData: typesUser;
}

export const BtnAddPay: React.FC<Props> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [load, setLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAllActivitiesToDashboard().then((res: any) => {
      console.log(res);
    });
  }, []);

  const handleSubmit = async ({
    method,
    onClose,
  }: {
    method: "MP" | "EF";
    onClose: () => void;
  }) => {
    try {
      setLoad(true);
      //   await payMonth({
      //     method,
      //     userData,
      //     monthName: month.name,
      //   });
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
        variant="shadow"
        color="primary"
        size="lg"
        className="fixed bottom-5 right-5"
        onPress={onOpen}
      >
        {" "}
        <MdAdd className="text-xl text-white" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-base gap-1">
                PAGO DE MES
              </ModalHeader>
              <ModalBody>
                <p className="text-neutral-900 text-sm">
                  {/* ¿{firstLetterUpper(userData.name)}{" "} */}
                  <i className="text-neutral-500">va a pagar el mes de</i>{" "}
                  {/* {month.name} ? */}
                </p>
                <p className="text-sm">
                  {`Selecciona el método de pago`}{" "}
                  <i className="text-green-600">{`Efectivo`}</i>
                  {" o "}
                  <i className="text-blue-600">{`MercadoPago`}</i>
                </p>
              </ModalBody>
              <ModalFooter className="flex flex-col lg:flex-row">
                {/* <Button
                  color="danger"
                  variant="light"
                  isDisabled={load}
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color="success"
                  variant="bordered"
                  onPress={() => handleSubmit({ method: "EF", onClose })}
                  isLoading={load}
                  isDisabled={load}
                >
                  <FaMoneyBillWave
                    className="mx-1 col-green-succes "
                    size={20}
                  />
                  Efectivo
                </Button>
                <Button
                  color="primary"
                  variant="bordered"
                  onPress={() => handleSubmit({ method: "MP", onClose })}
                  isLoading={load}
                  isDisabled={load}
                >
                  <Image
                    src={mp}
                    height={22}
                    className="mx-1 "
                    alt="no se encontr imagen"
                  />
                  MercadoPago
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

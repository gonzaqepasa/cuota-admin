import { payMonth } from "../../../../../api-next/month/payMonth";
import { MdAdd } from "react-icons/md";
import mp from "../../../../../styles/mp.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { typesActivity, typesUser } from "../../../../../types/types-user";
import { firstLetterUpper } from "../../../../../logic/firstLetterUpper";
import { FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mesActual } from "../../../../../config/moths.d";
import Cookies from "js-cookie";

interface Props {
  activity: typesActivity;
  userData: typesUser;
}

export const ButtonPay: React.FC<Props> = ({ activity, userData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const theme = Cookies.get("theme");

  const handleSubmit = async ({
    activity,
    method,
    onClose,
  }: {
    activity: typesActivity;
    method: "MP" | "EF";
    onClose: () => void;
  }) => {
    try {
      setLoad(true);
      await payMonth({
        method,
        userData,
        activity,
      });
      setLoad(false);
      onClose();
      router.push("/dashboard?search=");
    } catch (e) {
      setLoad(false);
      console.log(e);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="success"
        size="sm"
        variant="ghost"
        className=""
      >
        <FaMoneyBillWave />
        Pagar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={`${theme}`}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className="flex flex-col text-base gap-1 text-content1-100 "
                style={{ background: activity.color }}
              >
                {`PAGAR ${activity.nameActivity.toUpperCase()}`}
              </ModalHeader>
              <ModalBody className="text-content1-200">
                <p className=" text-sm">
                  ¿{firstLetterUpper(userData.name)}{" "}
                  <i className="">va a pagar el mes de</i> {mesActual()}
                  <i className="" style={{ color: activity.color }}>
                    {" "}
                    {`${firstLetterUpper(
                      activity.nameActivity
                    )} ${firstLetterUpper(activity.modality)}`}
                  </i>{" "}
                  ?
                </p>
                <p className="text-sm">
                  {`Selecciona el método de pago`}{" "}
                  <i className="text-green-600">{`Efectivo`}</i>
                  {" o "}
                  <i className="text-blue-600">{`MercadoPago`}</i>
                </p>
              </ModalBody>
              <ModalFooter className="flex flex-col lg:flex-row">
                <Button
                  color="danger"
                  variant="light"
                  isDisabled={load}
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  variant="bordered"
                  onPress={() =>
                    handleSubmit({ activity, onClose, method: "EF" })
                  }
                  isLoading={load}
                  isDisabled={load}
                  className="text-success-500"
                >
                  <FaMoneyBillWave
                    className="mx-1 col-green-succes "
                    size={20}
                  />
                  Efectivo
                </Button>
                <Button
                  variant="bordered"
                  onPress={() =>
                    handleSubmit({ method: "MP", onClose, activity })
                  }
                  isLoading={load}
                  isDisabled={load}
                  className="text-blue-600"
                >
                  <Image
                    src={mp}
                    height={22}
                    className="mx-1 "
                    alt="no se encontr imagen"
                  />
                  MercadoPago
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

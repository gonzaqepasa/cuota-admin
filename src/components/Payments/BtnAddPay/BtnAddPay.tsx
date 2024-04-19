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
import { typesActivity, typesUser } from "../../../types/types-user";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import Loading from "../../../app/loading";
import { numberToMoney } from "../../../logic/numberToMoney";
import { payMonth } from "../../../api-next/month/payMonth";
import { ButtonPay } from "../../UserComponent/Render/btn/Pay/Pay";
import Cookies from "js-cookie";
import { Content } from "next/font/google";

interface Props {
  userData: typesUser;
  size: "sm" | "md" | "lg" | undefined;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant?:
    | "light"
    | "shadow"
    | "flat"
    | "solid"
    | "bordered"
    | "faded"
    | "ghost"
    | undefined;
  content?: string;
}

export const BtnAddPay: React.FC<Props> = ({
  userData,
  size,
  content,
  variant,
  color,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [load, setLoad] = useState(true);
  const [activities, setActivities] = useState<typesActivity[]>([]);
  const router = useRouter();
  const theme = Cookies.get("theme");
  useEffect(() => {
   
    getAllActivitiesToDashboard().then((res: any) => {
      setActivities(res);
      setLoad(false);
    });
  }, []);

  return (
    <>
      <Button variant={variant} color={color} size={size} onPress={onOpen}>
        <MdAdd className="text-xl" />
        {content && <p>{content}</p>}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={`${theme}`}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-base gap-1">
                <h2 className="text-content1-300 text-sm flex gap-1 items-center">
                  {`PAGO DE MES `}
                  <p className="text-content1-100 text-base">
                    {userData.name?.toUpperCase()}
                  </p>
                </h2>
              </ModalHeader>
              <ModalBody>
                {activities.map((a) => (
                  <div
                    className="p-2 hover:bg-primary-200 transition-colors"
                    key={a._id}
                  >
                    {load ? (
                      <Loading />
                    ) : (
                      <div
                        className="flex flex-wrap  items-center border-b-2 p-2 justify-between"
                        style={{ borderBottomColor: a.color }}
                      >
                        <div className="flex items-center gap-2">
                          <p
                            className={`h-3 w-3 rounded-full `}
                            style={{ background: a.color }}
                          ></p>
                          <div>
                            <p className="text-content1-200">
                              {firstLetterUpper(a.nameActivity)}
                            </p>
                            <p className="text-sm" style={{ color: a.color }}>
                              {firstLetterUpper(a.modality)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-content1-300">
                            {numberToMoney(a.price)}
                          </p>

                          <ButtonPay userData={userData} activity={a} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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

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

interface Props {
  userData: typesUser;
}

export const BtnAddPay: React.FC<Props> = ({ userData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [load, setLoad] = useState(false);
  const [activities, setActivities] = useState<typesActivity[]>([]);
  const router = useRouter();
  const theme = Cookies.get("theme");
  useEffect(() => {
    getAllActivitiesToDashboard().then((res: any) => {
      setActivities(res);
    });
  }, []);

  // const handleSubmit = async ({
  //   activity,
  //   method,
  //   onClose,
  // }: {
  //   activity: typesActivity;
  //   method: "MP" | "EF";
  //   onClose: () => void;
  // }) => {
  //   try {
  //     setLoad(true);
  //     await payMonth({
  //       method,
  //       userData,
  //       activity,
  //     });
  //     setLoad(false);
  //     onClose();
  //     router.refresh();
  //   } catch (e) {
  //     setLoad(false);
  //     console.log(e);
  //   }
  // };

  return (
    <>
      <Button variant="shadow" color="primary" size="lg" onPress={onOpen}>
        {" "}
        <MdAdd className="text-xl " />
        <p>REGISTRAR PAGO</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={`${theme}`}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-base gap-1">
                <h2 className="text-content1-100">PAGO DE MES</h2>
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

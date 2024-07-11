"use client";
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
import { typesActivity, typesUser } from "../../../types/types-user";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import { numberToMoney } from "../../../logic/numberToMoney";
import { ButtonPay } from "../../UserComponent/Render/btn/Pay/Pay";
import Cookies from "js-cookie";
import { orderByNameActivity } from "../../../logic/orderByMonthName";
import { CgArrowLongRight } from "react-icons/cg";

interface Props {
  userData: typesUser;
  activities: typesActivity[];
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
  activities,
  size,
  content,
  variant,
  color,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const theme = Cookies.get("theme");

  return (
    <>
      <Button
        className="  "
        variant={variant}
        color={color}
        size={size}
        onPress={onOpen}
      >
        <FaMoneyBillWave />
        {content && <p className="">{content}</p>}
      </Button>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`${theme}`}
      >
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
                {orderByNameActivity(activities).map((a) => (
                  <div
                    className="p-2 hover:bg-primary-200 transition-colors"
                    key={a._id}
                  >
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
                  </div>
                ))}
              </ModalBody>
              <ModalFooter className="flex flex-col lg:flex-row"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

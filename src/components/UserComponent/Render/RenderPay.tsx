"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { typesMonth, typesUser } from "../../../types/types-user";
import Image from "next/image";
import Logo from "../../../styles/images/fevicon.png";
import { orderByDate } from "../../../logic/orderByMonthName";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import CountdownTimer from "../../Dashboard/UsersRender/Table/CountdownTimer";
import { isUserWithinPaymentMonth } from "../../Dashboard/UsersRender/Table/logicPayment";
import { numberToMoney } from "../../../logic/numberToMoney";
import { FaMoneyBillWave } from "react-icons/fa";
import mp from "../../../styles/mp.png";
import { formatDateTime } from "../../../logic/dateFormated";
import { calculateExpirationDate } from "../../Payments/BtnAddPay/logicPayments";
import { ButtonCancel } from "./btn/Cancel/Cancel";

interface Props {
  user: typesUser;
  payments: typesMonth[];
}
const RenderPay: React.FC<Props> = ({ user, payments }) => {
  console.log(payments);
  return (
    <>
      <div className="min-h-[100vh] flex flex-col items-center py-4 gap-4">
        {orderByDate(payments).map((p, index) => (
          <Card
            key={p._id}
            className={`shadow-lg ${
              index === 0 ? "text-lg md:scale-110 bg-primary-300" : " text-sm"
            } ${
              isUserWithinPaymentMonth(p.createdAt) &&
              "border-success-400 border-2"
            }`}
          >
            <CardHeader className="gap-2">
              <div
                className=" p-1 rounded-full"
                style={{ background: p.activity.color }}
              >
                <Image src={Logo} height={30} alt="" />
              </div>
              <h2 className="">{firstLetterUpper(p.activity.nameActivity)}</h2>
              <h3 style={{ color: p.activity.color }}>
                {firstLetterUpper(p.activity.modality)}
              </h3>
              <Tooltip
                color={
                  isUserWithinPaymentMonth(p.createdAt) ? "success" : "danger"
                }
                content={
                  isUserWithinPaymentMonth(p.createdAt)
                    ? "Usuario activo"
                    : "Usuario fuera de pago"
                }
              >
                <p
                  className={`h-6 w-6 rounded-full shadow-inner shadow-black  ${
                    isUserWithinPaymentMonth(p.createdAt)
                      ? "bg-green-500"
                      : "bg-red-600"
                  }`}
                ></p>
              </Tooltip>
            </CardHeader>
            <Divider />
            <CardBody className="">
              <div className="flex flex-wrap  items-center sm:gap-14 gap-8 px-5 ">
                <div className="">
                  <p className="text-content1-400 ">Tiempo disponible</p>
                  <CountdownTimer
                    paymentDate={new Date(p.createdAt)}
                    expirationDate={
                      p.expirationDate
                        ? new Date(p.expirationDate)
                        : calculateExpirationDate(new Date(p.createdAt), 1)
                    }
                  />
                </div>
                <div>
                  <p className="text-content1-400 ">Precio</p>
                  <p className="flex items-center">
                    {p.method === "EF" ? (
                      <FaMoneyBillWave
                        className="mx-1 text-success-600 "
                        size={20}
                      />
                    ) : (
                      <Image
                        src={mp}
                        height={20}
                        className="mx-1 "
                        alt="no se encontr imagen"
                      />
                    )}
                    {numberToMoney(p.pricePay)}
                  </p>
                </div>

                <div>
                  <p>{firstLetterUpper(p.monthName)}</p>
                  <p className="text-content1-400 text-xs">
                    {formatDateTime(new Date(p.createdAt))}
                  </p>
                </div>
                {p.expirationDate && (
                  <div>
                    <p className="text-sm text-content1-400"> Vencimiento:</p>
                    <p>{formatDateTime(new Date(p.expirationDate))}</p>
                  </div>
                )}
              </div>
            </CardBody>
            <CardFooter>
              <div>
                <ButtonCancel el={p} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default RenderPay;

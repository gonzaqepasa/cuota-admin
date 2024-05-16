"use client";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import CountdownTimer from "../Dashboard/UsersRender/Table/CountdownTimer";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { typesMonth } from "../../types/types-user";
import { isUserWithinPaymentMonth } from "../Dashboard/UsersRender/Table/logicPayment";
import Logo from "../../styles/images/fevicon.png";
import IMG1 from "../../styles/images/hero-bg.jpg";

import Image from "next/image";
import { calculateExpirationDate } from "../Payments/BtnAddPay/logicPayments";
import { formatDateTime } from "../../logic/dateFormated";
import { CgInfo } from "react-icons/cg";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";

interface Props {
  lastPayment: typesMonth;
}
const LastPaymentComponent: React.FC<Props> = ({ lastPayment }) => {
  if (!lastPayment)
    return (
      <>
        {" "}
        <Card
          isFooterBlurred
          radius="none"
          className="w-full h-[300px] col-span-12 sm:col-span-7 max-w-5xl"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start"></CardHeader>
          <Image
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover opacity-20"
            src={IMG1}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="  w-full  max-w-3xl border-l-3  items-center  text-neutral-200  p-2 py-6   ">
              <p>SIN PAGOS</p>
              <p className="flex items-center gap-1 text-neutral-600 text-xs">
                <CgInfo color="white" />
                Si ya realizaste un pago, comparte el comprobante por
                <Link
                  className="text-green-500 flex items-center gap-1 hover:scale-105 transition-transform"
                  target="_blank"
                  href={"https://wa.me/+541153741713"}
                >
                  <FaWhatsapp />
                  WhatsApp
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </>
    );
  if (isUserWithinPaymentMonth(lastPayment?.createdAt))
    return (
      <>
        <Card
          isFooterBlurred
          radius="none"
          className="w-full h-[300px] lg:h-[450px] col-span-12 sm:col-span-7 max-w-5xl"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <h4 className="text-white/90 font-medium text-xl">
              {"ULTIMO PAGO"}
            </h4>
          </CardHeader>
          <Image
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover opacity-20"
            src={IMG1}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div
              style={{ borderColor: lastPayment.activity.color }}
              className="  w-full  border-l-3 grid grid-cols-2 items-center  text-neutral-200  p-2 py-6   "
            >
              <div className="flex flex-col items-start ">
                {/* ////// datos ////// */}

                <div>
                  <p className="text-content1-400 text-sm">Pago:</p>
                  <p>{formatDateTime(new Date(lastPayment.createdAt))}</p>
                </div>
                {lastPayment.expirationDate && (
                  <div>
                    <p className="text-content1-400 text-sm">Vencimiento:</p>
                    <p>
                      {formatDateTime(new Date(lastPayment.expirationDate))}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col  justify-start gap-2  ">
                {/* ////// LASTPAYMENT ////// */}
                <div className="flex flex-col items-center">
                  <p className=" text-3xl">
                    {firstLetterUpper(lastPayment.activity.nameActivity)}
                  </p>
                </div>
                <Button radius="full" size="sm" color="success" disabled>
                  <AiFillLike size={20} color="white" className="drop-shadow" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
        {/* // /* //////// COMPONENTE FLOTANTE //////// */}
        <div
          style={{ borderColor: lastPayment.activity.color }}
          className={`w-screen max-w-3xl rounded-b-xl rounde-xl shadow-xl flex border-b items-center justify-between px-2 sticky top-0 z-30 bg-primary-100 `}
        >
          <div>
            <div className="flex gap-1 px-2 items-center">
              <p className="text-white text-sm">
                {firstLetterUpper(lastPayment.activity.nameActivity)}
              </p>
            </div>
          </div>
          <CountdownTimer
            paymentDate={new Date(lastPayment.createdAt)}
            // bg={true}
            size={1.4}
            expirationDate={
              lastPayment.expirationDate
                ? new Date(lastPayment.expirationDate)
                : calculateExpirationDate(new Date(lastPayment.createdAt), 1)
            }
          />
          <div></div>
        </div>
        ;
      </>
    );

  return (
    //Si el ultimo pago ya vencio
    <>
      <Card
        isFooterBlurred
        radius="none"
        className="w-full h-[300px] col-span-12 sm:col-span-7 max-w-5xl"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white/90 font-medium text-xl">{"ULTIMO PAGO"}</h4>
        </CardHeader>
        <Image
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover opacity-20"
          src={IMG1}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div
            style={{ borderColor: lastPayment.activity.color }}
            className="  w-full   border-l-3 grid grid-cols-3 items-center  text-neutral-200 p-2 py-6  "
          >
            <div>
              <p>{firstLetterUpper(lastPayment.activity.nameActivity)}</p>
            </div>
            <div>
              <p className="text-xs text-content1-400">Fecha de pago</p>
              <p>
                {firstLetterUpper(
                  formatDateTime(new Date(lastPayment.createdAt))
                )}
              </p>
            </div>
            {lastPayment.expirationDate && (
              <div>
                <p className="text-xs text-content1-400">Expira</p>
                <p>
                  {firstLetterUpper(
                    formatDateTime(new Date(lastPayment.expirationDate))
                  )}
                </p>
              </div>
            )}
            <Button
              radius="full"
              size="sm"
              color="danger"
              disabled
              className="drop-shadow"
            >
              <p>Vencido</p>
              <AiFillDislike size={20} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default LastPaymentComponent;

"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { typesMonth, typesUser } from "../../../types/types-user";
import CardMonth from "./Card/CardMonth";
import { dateMonth, mesActual, monthOfPay } from "../../../config/moths.d";
import { useEffect } from "react";
import { orderByMonth } from "../../../logic/orderByMonthName";
import { FcCheckmark } from "react-icons/fc";

interface Props {
  user: typesUser;
}

export const RenderMonths: React.FC<Props> = ({ user }) => {
  const currentMonth = (monthName: string) => mesActual() === monthName;

  useEffect(() => {
    const scrollToComponent = () => {
      const element = document.getElementById(String(monthOfPay(mesActual())));

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    };

    // Llama a la función para realizar el scroll cuando el componente se monta
    scrollToComponent();
  }, []);

  if (!user.active)
    return (
      <>
        <div>El usuario esta inactivo, debes activarlo para ver sus cuotas</div>
      </>
    );
  return (
    <div className="flex flex-col lg:flex-row w-full lg:justify-center lg:w-full lg:overflow-y-scroll  h-[calc(100vh-40px)] ">
      <div className="flex lg:hidden justify-center py-3  bg-neutral-500 w-screen">
        <h2 className="text-neutral-100 text-xl">Pagos</h2>
      </div>
      <Accordion
        variant="light"
        className={`   text-neutral-200 lg:w-11/12   `}
        defaultExpandedKeys={[String(dateMonth)]}
      >
        {orderByMonth(user.calendar.months).map((m: typesMonth, index) => (
          <AccordionItem
            startContent={m.isPay && <FcCheckmark className="" />}
            key={monthOfPay(m.monthName)}
            aria-label="Accordion 1"
            title={m.monthName}
            id={String(monthOfPay(m.monthName))}
            className={`${m.isPay && "bg-green-500/10"} px-2 ${
              m.monthName === mesActual() && "border-2 border-cyan-500"
            }`}
            // startContent={}
          >
            <CardMonth el={m} index={index} user={user} />
          </AccordionItem>
          /////////// -> end card
        ))}
      </Accordion>
    </div>
  );
  ///////////////////////////////////////////////////////////////////////
};

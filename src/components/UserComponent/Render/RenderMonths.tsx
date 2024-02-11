"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { typesUser } from "../../../types/types-user";
import CardMonth from "./Card/CardMonth";
import { dateMonth, mesActual, monthOfPay } from "../../../config/moths.d";
import { useEffect } from "react";
import { orderByMonth } from "../../../logic/orderByMonthName";

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
    <div className="flex w-full lg:justify-center lg:overflow-y-scroll max-h-[calc(100vh)]  ">
      <Accordion
        variant="light"
        className={`   text-neutral-200 w-11/12  `}
        defaultExpandedKeys={[String(dateMonth)]}
      >
        {orderByMonth(user.calendar.months).map((m, index) => (
          <AccordionItem
            key={monthOfPay(m.monthName)}
            aria-label="Accordion 1"
            title={m.monthName}
            id={String(monthOfPay(m.monthName))}
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

"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { typesMonth, typesUser } from "../../../types/types-user";
import CardMonth from "./Card/CardMonth";
import { dateMonth, mesActual, monthOfPay } from "../../../config/moths.d";
import { useEffect } from "react";
import { orderByMonth } from "../../../logic/orderByMonthName";
import { FcCheckmark } from "react-icons/fc";
import { arrayWithNamesMonths } from "../../../config/infoMonths";

interface Props {
  user: typesUser;
}

export const RenderMonths: React.FC<Props> = ({ user }) => {
  const currentMonth = (monthName: string) => mesActual() === monthName;
  console.log(user);
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
  const isThisMonth = (m: any) => m.monthName === mesActual();
  if (user.status === "inactivo")
    return (
      <>
        <div>El usuario esta inactivo, debes activarlo para ver sus cuotas</div>
      </>
    );

  function findPaidMonth(monthName: string): typesMonth | undefined {
    // Buscar el mes con el nombre dado
    const targetMonth = user.months.find((m) => m.monthName === monthName);

    // Retornar el mes si está pagado, de lo contrario, retornar false
    return targetMonth && targetMonth.isPay ? targetMonth : undefined;
  }
  return (
    <div className="flex flex-col justify-center  items-center lg:max-w-none max-w-xl lg:py-5  ">
      <div
        style={{ backgroundColor: user.activity.color }}
        className="flex sticky top-14 z-30 lg:hidden justify-center py-3   shadow-md w-screen"
      >
        <h2 className="text-neutral-100 text-xl">Pagos</h2>
      </div>
      <Accordion
        variant="light"
        className={`   text-neutral-200 lg:w-11/12   `}
        defaultExpandedKeys={[String(dateMonth)]}
      >
        {orderByMonth(arrayWithNamesMonths).map((m, index) => (
          <AccordionItem
            startContent={findPaidMonth(m.name) && <FcCheckmark className="" />}
            key={m.num}
            // aria-label="Accordion 1"
            title={m.name}
            // id={String(monthOfPay(el.monthName))}
            // className={`${el.isPay && "bg-green-500/10"}  px-2 ${
            //   isThisMonth(m) && "border-2 rounded-md "
            // }`}
            // style={{ borderColor: user.activity.color }}
            // // startContent={}
          >
            <CardMonth
              month={m}
              monthPayed={findPaidMonth(m.name)}
              index={index}
              user={user}
            />
          </AccordionItem>
          /////////// -> end card
        ))}
      </Accordion>
    </div>
  );
  ///////////////////////////////////////////////////////////////////////
};

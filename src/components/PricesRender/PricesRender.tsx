import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { orderById } from "../../logic/orderByMonthName";
import { selectColor } from "../../logic/selectColor";
import { typesActivity } from "../../types/types-user";
import { EditPriceModal } from "./EditPrice/EditPrice";
import { numberToMoney } from "../../logic/numberToMoney";
import Link from "next/link";
import { fromNameToUrl } from "../../logic/fromNameToUrl";
import { EditColorActivity } from "./EditColor/EditColorActivity";
import ModalDeleteActivity from "./DeleteActivity/ModalDeleteActivity";
import ModalCreateActivity from "./CreateActivity/ModalCreateActivity";
import { firstLetterUpper } from "../../logic/firstLetterUpper";

interface Props {
  data: typesActivity[] | undefined;
}

export const PricesRender: React.FC<Props> = ({ data }) => {
  // Component...
  if (data === undefined)
    return (
      <>
        <div>
          <ModalCreateActivity />
        </div>
      </>
    );
  return (
    <>
      <div className="flex justify-center p-5 ">
        <ModalCreateActivity />
      </div>
      <div
        className={` flex justify-center flex-wrap max-w-[1000px] items-center gap-6 p-5`}
      >
        {orderById(data).map((el: typesActivity) => (
          <Card
            className={`w-[400px] bg-neutral-800 shadow-md text-neutral-300 lg:hover:scale-110 `}
            key={el.id}
          >
            <CardHeader className="flex items-center mx-3 gap-2">
              <span
                style={{ backgroundColor: el.color }}
                className="rounded-full h-3 w-3 "
              ></span>
              <p className="">{firstLetterUpper(el.nameActivity)}</p>
              <Link
                className=" text-blue-600 text-xs transition-colors hover:text-blue-500"
                href={`/dashboard/${fromNameToUrl(el.nameActivity)}`}
              >
                Ir a la actividad
              </Link>
            </CardHeader>
            <Divider className="bg-neutral-200" />
            <CardBody>
              <div>
                <p
                  style={{
                    color: el.color,
                  }}
                  className={``}
                >
                  {firstLetterUpper(el.modality)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-2xl">{numberToMoney(el.price)}</p>
                <EditPriceModal data={el} />
                <EditColorActivity data={el} />
              </div>
            </CardBody>
            <Divider className="bg-neutral-200"/>
            <CardFooter className="justify-end">
              <ModalDeleteActivity data={el} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

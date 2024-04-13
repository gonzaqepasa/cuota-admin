import { useRouter, useSearchParams } from "next/navigation";

import { url } from "../../../config/env_d";
import { typesMonth, typesUser } from "../../../types/types-user";

import axios from "axios";
import { orderByMonth } from "../../../logic/orderByMonthName";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import { selectColor } from "../../../logic/selectColor";
import { arrayWithNamesMonths } from "../../../config/infoMonths";
import getUser from "../../../api-next/user/getUser";
import CardMonthCliente from "./CardMonthCliente";
import LogoText from "../../../styles/images/logo.png";
import Logo from "../../../styles/images/fevicon.png";

interface Params {
  params: { id: string };
}
export default async function List({ params }: Params) {
  const data = await getUser({ id: params.id });

  console.log("aca esta la data del client", data);
  function findPaidMonth(monthName: string): typesMonth | undefined {
    // Buscar el mes con el nombre dado
    const targetMonth = data.months.find(
      (m: typesMonth) => m.monthName === monthName.trim().toLowerCase()
    );

    // Retornar el mes si está pagado, de lo contrario, retornar false
    return targetMonth && targetMonth.isPay ? targetMonth : undefined;
  }
  return (
    <>
      <div className="bg-image-center flex  flex-col items-center min-h-screen p-6">
        <div className="m-5 flex flex-col items-center">
          <Image src={Logo} alt="" width={100} height={100} />
          <Image
            className="drop-shadow"
            src={LogoText}
            alt=""
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col items-center">
          <div>
            <p className="text-2xl text-neutral-100">
              {firstLetterUpper(data.name)}
            </p>
          </div>
          <div className="flex items-center gap-1 text-neutral-400">
            <p className="">{firstLetterUpper(data.activity.nameActivity)}</p>-
            <p
              style={{ color: selectColor(data.activity.nameActivity) }}
              className="text-neutral-500 font-semibold"
            >
              {firstLetterUpper(data.activity.modality)}
            </p>
          </div>
        </div>
        <div className=" max-w-2xl  w-[calc(100%-1px)] grid grid-cols-2 gap-1 my-2 p-1 rounded">
          {orderByMonth(arrayWithNamesMonths).map((m, index) => (
            <div key={m.num}>
              <CardMonthCliente m={m} month={findPaidMonth(m.name)} />
            </div>
          ))}

          {/* {orderByMonth(data.months).map((m) => (
            <div
              className={`  p-1 rounded-md ${
                m.isPay ? "bg-green-200" : "bg-neutral-200"
              }`}
              key={m.id}
            >
              <div>
                <p className="text-neutral-800 text-center">{m.monthName}</p>
              </div>
              <div
                className={` h-20 flex items-center justify-center ${
                  m.isPay ? "" : ""
                }`}
              >
                {m.isPay ? (
                  <p className="text-3xl text-green-600">
                    <IoMdCheckmarkCircleOutline />
                  </p>
                ) : (
                  <p className="text-red-600">
                    <ImCancelCircle />
                  </p>
                )}
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}

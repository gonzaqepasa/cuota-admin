import { useRouter, useSearchParams } from "next/navigation";

import { url } from "../../../config/env_d";
import { typesUser } from "../../../types/types-user";

import axios from "axios";
import { orderByMonth } from "../../../logic/orderByMonthName";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { firstLetterUpper } from "../../../logic/firstLetterUpper";
import { selectColor } from "../../../logic/selectColor";
import { arrayWithNamesMonths } from "../../../config/infoMonths";

interface Params {
  params: { id: string };
}
export default async function List({ params }: Params) {
  const Logo =
    "https://firebasestorage.googleapis.com/v0/b/cuota-admin-2e674.appspot.com/o/logos%2Flogo%20fin%20chico.png?alt=media&token=90a5e599-e9f0-4f7c-b443-1ade2314c8b2";
  const LogoText =
    "https://firebasestorage.googleapis.com/v0/b/cuota-admin-2e674.appspot.com/o/logos%2FIndomito%202.png?alt=media&token=fbfc2026-57e1-49bc-a674-b7623f7d364d";

  const { data } = await axios.get(`${url}/user/user?USER=${params.id}`);

  console.log("aca esta la data del client", data);

  return (
    <>
      <div className=" flex bg-neutral-200 flex-col items-center min-h-screen p-6">
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
            <p className="text-xl">{firstLetterUpper(data.name)}</p>
          </div>
          <div className="flex items-center gap-1">
            <p
              className=""
              style={{ color: selectColor(data.activity.nameActivity) }}
            >
              {data.activity.nameActivity}
            </p>
            -<p className="text-neutral-500 ">{data.activity.modality}</p>
          </div>
        </div>
        <div className=" max-w-196 w-[calc(100%-1px)] grid grid-cols-2 gap-1 my-2 bg-neutral-500 p-1 rounded">
          {orderByMonth(arrayWithNamesMonths).map((m, index) => (
            <div key={m.num}>
              <h2>{m.name}</h2>
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

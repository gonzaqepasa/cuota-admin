import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonAdd } from "../../../src/components/AddUser/ButtonAdd/ButtomAdd";
import { AddUserForm } from "../../../src/components/AddUser/Form/AddUserForm";
import { Title } from "../../../src/components/Title/Title";
import Loading from "../../../src/components/Loading/Loading";
import { RenderList } from "../../../src/components/RenderList/RenderList";
import { url } from "../../../src/config/env_d";
import { typesActivity, typesUser } from "../../../src/types/types-user";
import { Notification } from "../../../src/components/Notification/Notification";
import ProviderAuth from "../../providerAuth";
import axios from "axios";
import { orderByMonth } from "../../../src/logic/orderByMonthName";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { firstLetterUpper } from "../../../src/logic/firstLetterUpper";
import { selectColor } from "../../../src/logic/selectColor";
export default function List() {
  const router = useRouter();

  const { id } = router.query;
  var arrayDeStrings = String(id).split("$");
  const Logo =
    "https://firebasestorage.googleapis.com/v0/b/cuota-admin-2e674.appspot.com/o/logos%2Flogo%20fin%20chico.png?alt=media&token=90a5e599-e9f0-4f7c-b443-1ade2314c8b2";
  const LogoText =
    "https://firebasestorage.googleapis.com/v0/b/cuota-admin-2e674.appspot.com/o/logos%2FIndomito%202.png?alt=media&token=fbfc2026-57e1-49bc-a674-b7623f7d364d";

  // Estados de componente

  const [load, setLoad] = useState(true);
  const [dataUser, setDataUser] = useState<typesUser>();
  const [error, setError] = useState({ msg: "" });

  //Para obtener datos apenas ingresas a la pagina
  useEffect(() => {
    (async function () {
      setLoad(true);
      try {
        const { data } = await axios.get(
          `${url}/user/user?USER=${arrayDeStrings[1]}`
        );
        setDataUser(data);
        setLoad(false);
        console.log("aca esta la data del client", data);
        setError({ msg: "" });
        // console.log(dataUser);
      } catch (err) {
        setLoad(false);
        setError({ msg: "Problemas con la bd" });
        console.log(err);
      }
    })();
  }, [id]);

  if (load)
    return (
      <div className="loadContainer">
        <Loading />;
      </div>
    );
  if (error.msg) return <div className="main"> {error.msg}</div>;
  if (dataUser)
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
              <p className="text-xl">{firstLetterUpper(dataUser.name)}</p>
            </div>
            <div className="flex items-center gap-1">
              <p
                className=""
                style={{ color: selectColor(dataUser.activity.nameActivity) }}
              >
                {dataUser.activity.nameActivity}
              </p>
              -<p className="text-neutral-500 ">{dataUser.activity.modality}</p>
            </div>
          </div>
          <div className=" max-w-196 w-[calc(100%-1px)] grid grid-cols-2 gap-1 my-2 bg-neutral-500 p-1 rounded">
            {orderByMonth(dataUser.calendar.months).map((m) => (
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
            ))}
          </div>
        </div>
      </>
    );
}

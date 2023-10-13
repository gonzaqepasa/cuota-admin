import { useEffect, useState } from "react";
import { url } from "../../config/env_d";
import { mesActual } from "../Deptor/logic/moths.d";
import { typesActivity, typesMonth } from "../../types/types-user";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { selectColor } from "../../logic/selectColor";
import { useRouter } from "next/router";
import { editActive } from "../../../services/user.service";
import { visibilityUser } from "../../logic/visibilityUser";

interface Props {
  activity: string;
  getDataAgain: () => void;
}

export const Notification: React.FC<Props> = ({ activity, getDataAgain }) => {
  const [userDebtor, setUserDebtor] = useState<typesMonth[]>([]);
  const [view, setView] = useState<boolean>(false);

  const [userDebtorRandom, setUserDeptorRandom] = useState<typesMonth>();
  // console.log(userDebtor);
  const route = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const resMonth = await fetch(
          `${url}/month/get-months?month=${mesActual()}&ispay=false`
        );
        const resMonthJson = await resMonth.json();
        const userDebtorActivity = resMonthJson.filter(
          (month: typesMonth) =>
            month.calendar.User.activity.nameActivity === activity &&
            month.calendar.User.active === true
        );
        const random = Math.floor(Math.random() * userDebtorActivity.length);
        setUserDebtor(userDebtorActivity);
        setUserDeptorRandom(userDebtorActivity[random]);
        // console.log("Esto no debe pasar cuando abro y cierro addUser");
      } catch (err) {
        console.log(err);
      }
    })();
  }, [activity]);

  useEffect(() => {
    const random = Math.floor(Math.random() * userDebtor.length);
    setUserDeptorRandom(userDebtor[random]);
    const timeout = setTimeout(() => {
      // console.log("holasdasdasdasd");
      setView(true);
    }, 300000);
    return () => clearTimeout(timeout);
  }, [view]);

  return (
    <div className={`fixed bottom-5 left-5 `}>
      {userDebtor.length > 0 && userDebtorRandom?.id && (
        <div className=" backg-card-user  rounded  shadow-md shadow-neutral-900   mr-2">
          <div
            className={`relative ${
              view ? "flex" : "hidden"
            } flex-col items-start justify-evenly  animate-one   max-w-96 h-32 pl-4 pr-10  `}
          >
            <button
              onClick={() => {
                setView(false);
              }}
              className={`absolute bg-red-800 hover:bg-red-700 transition-colors h-6 w-6  text-neutral-300 top-0 right-0  rounded-tr rounded-bl-lg  text-xs  flex items-center justify-center hover:scale-105 `}
            >
              X
            </button>
            <p className={`text-neutral-400 font-extralight my-3 `}>
              <i
                className={`mx-1 text-neutral-300 `}
                style={{ color: ` ${selectColor(activity)} ` }}
              >
                {" "}
                {firstLetterUpper(userDebtorRandom.calendar.User.name)}{" "}
              </i>
              no pago el mes de {mesActual()}
            </p>
            <div className={`flex flex-col items-start`}>
              <button
                onClick={(e) =>
                  visibilityUser(
                    e,
                    {
                      id: Number(userDebtorRandom.calendar.User.id),
                      active: true,
                    },
                    getDataAgain
                  )
                }
                className={`text-sm transition  text-neutral-500 hover:text-neutral-400 `}
              >
                {"No esta viniendo (Inactivar)"}
              </button>
              <button
                onClick={() =>
                  route.push(`/user/${userDebtorRandom.calendar.User.id}`)
                }
                className={`text-sm transition  text-sky-600 hover:text-sky-500  `}
              >
                {"Si viene (Ir al perfil)"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

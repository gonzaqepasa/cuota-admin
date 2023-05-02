import { useEffect, useState } from "react";
import { url } from "../../config/services-url";
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
        console.log("Esto no debe pasar cuando abro y cierro addUser");
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
    <div className={`fixed bottom-5 left-5 shadow-md`}>
      {userDebtor.length > 0 && userDebtorRandom?.id && (
        <div className=" backg-animate  rounded-lg  mr-2">
          <div
            className={`relative ${
              view ? "flex" : "hidden"
            } flex-col items-start justify-evenly  animate-one   max-w-96 h-36  px-8 `}
          >
            <button
              onClick={() => {
                setView(false);
              }}
              className={`absolute text-red-700 top-1 transition right-3 font-semibold flex justify-center hover:text-red-600`}
            >
              x
            </button>
            <p className={`text-neutral-300 font-extralight text-base`}>
              <i style={{ color: selectColor(activity) }}>
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
                className={`text-sm transition font-light text-red-400 hover:text-red-500 my-1`}
              >
                {"No esta viniendo (Inactivar)"}
              </button>
              <button
                onClick={() =>
                  route.push(`/user/${userDebtorRandom.calendar.User.id}`)
                }
                className={`text-sm transition font-light text-sky-500 hover:text-sky-600 `}
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

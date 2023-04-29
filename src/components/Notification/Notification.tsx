import { useEffect, useState } from "react";
import { url } from "../../config/services-url";
import { mesActual } from "../Deptor/logic/moths.d";
import { typesActivity, typesMonth } from "../../types/types-user";
import { firstLetterUpper } from "../../logic/firstLetterUpper";
import { selectColor } from "../../logic/selectColor";

interface Props {
  activity: string;
}

export const Notification: React.FC<Props> = ({ activity }) => {
  const [userDebtor, setUserDebtor] = useState<typesMonth[]>([]);
  const [view, setView] = useState<boolean>(false);
  const random = Math.floor(Math.random() * userDebtor.length);
  const userDebtorRandom = userDebtor[random];
  console.log(userDebtor);
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
        setUserDebtor(userDebtorActivity);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [activity]);

  const render = () => {
    setTimeout(() => {
      console.log("holasdasdasdasd");
      setView(true);
    }, 5000);
  };
  render();
  return (
    <div className={`fixed bottom-5 left-5 `}>
      <span className="animate-one ">
        {userDebtor.length > 0 && (
          <div
            className={`relative ${
              view ? "flex" : "hidden"
            } flex-col items-start justify-evenly backg-animate   rounded-lg w-96 h-36  px-6 `}
          >
            <button
              className={`absolute text-red-700 top-0 right-2 font-semibold flex justify-center`}
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
                className={`text-sm transition font-light text-red-400 hover:text-red-500 my-1`}
              >
                {"No esta viniendo (Inactivar)"}
              </button>
              <button
                className={`text-sm transition font-light text-sky-500 hover:text-sky-600 `}
              >
                {"Si viene (Ir al perfil)"}
              </button>
            </div>
          </div>
        )}
      </span>
    </div>
  );
};

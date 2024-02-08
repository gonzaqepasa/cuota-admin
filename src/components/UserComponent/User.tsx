import { useEffect, useState } from "react";
import { typesUser } from "../../types/types-user";
import { orderByMonth } from "../../logic/orderByMonthName";
import { Description } from "./Description/Description";
import { selectColor } from "../../logic/selectColor";
import { url } from "../../config/env_d";
import { NameUser } from "./NameUser/NameUser";
import { RenderUser } from "./Render/RenderUser";
import { ConfigUser } from "./Config/ConfigUser";
import { ActivityUser } from "./ActivityUser/ActivityUser";
import { visibilityUser } from "../../logic/visibilityUser";
import { mesActual } from "../../config/moths";
import { PhoneUser } from "./PhoneUser/PhoneUser";

interface Props {
  userData: typesUser;
  id: string;
}

export const User: React.FC<Props> = ({ userData, id }) => {
  const [user, setUser] = useState(userData);
  const [monthData, setMonthData] = useState<any>(
    orderByMonth(user.calendar.months)
  );
  async function getUserAgain() {
    try {
      const res = await fetch(`${url}/user/user?USER=${id}`);
      const data = await res.json();
      setMonthData(orderByMonth(data.calendar.months));
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const element = document.getElementById(mesActual());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  //  console.log( Math.floor(Math.random()*10000))
  // console.log("esto es userdata", userData);
  if (user)
    return (
      <div
        className={`flex flex-col items-center  w-screen  min-h-screen  ${
          !user.active && `opacity-40 `
        }`}
      >
        <div className="flex items-end flex-wrap  justify-center pb-4  w-11/12">
          <div className={` backg-card-user  h-full rounded w-96  p-2 m-2`}>
            <NameUser getDataAgain={getUserAgain} user={user} />
            <ActivityUser getDataAgain={getUserAgain} user={user} />
            <PhoneUser getDataAgain={getUserAgain}  user={user}/>
            <Description
              id={Number(id)}
              color={selectColor(user.activity.nameActivity)}
              description={user.description}
              getDataAgain={getUserAgain}
            />
          </div>
          <div className={`backg-card-user rounded  h-full w-96 p-2 m-2`}>
            <ConfigUser userData={user} getDataAgain={getUserAgain} />
          </div>
        </div>

        {!user.active ? (
          <div className="w-screen h-40  flex  justify-center">
            <button
              className={`text-white mb-5 hover:text-blue-300 `}
              onClick={(e) =>
                visibilityUser(
                  e,
                  { id: Number(user.id), active: false },
                  getUserAgain
                )
              }
            >
              REACTIVAR USUARIO
            </button>
          </div>
        ) : (
          <RenderUser
            user={user}
            userData={userData}
            monthData={monthData}
            getUserAgain={getUserAgain}
          />
        )}
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;

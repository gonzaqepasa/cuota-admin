import { useState } from "react";
import { typesUser } from "../../types/types-user";
import styles from "./User.module.scss";
import { orderByMonth } from "../../logic/orderByMonthName";
import { Description } from "./Description/Description";
import { selectColor } from "../../logic/selectColor";
import { url } from "../../config/services-url";
import { NameUser } from "./NameUser/NameUser";
import { RenderUser } from "./Render/RenderUser";
import { ConfigUser } from "./Config/ConfigUser";
import { ActivityUser } from "./ActivityUser/ActivityUser";
import { visibilityUser } from "../../logic/visibilityUser";

interface Props {
  userData: typesUser;
  id: string;
}

 const User: React.FC<Props> = ({ userData, id }) => {
  const [monthData, setMonthData] = useState<any>(
    orderByMonth(userData.calendar.months)
  );
  const [user, setUser] = useState(userData);
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
  //  console.log( Math.floor(Math.random()*10000))
  console.log("esto es userdata", userData);
  if (user)
    return (
      <div
        className={`${styles.allUserComponent}  ${
          !user.active && styles.isInactiveUser
        }`}
      >
        <NameUser getDataAgain={getUserAgain} user={user} />
        <ActivityUser user={user} />
        <Description
          id={Number(id)}
          color={selectColor(user.activity.nameActivity)}
          description={user.description}
          getDataAgain={getUserAgain}
        />
        {!user.active && (
          <div className="w-screen hunt2 flex justify-center">
            <button
              className={`text-white mb-5 hover:text-blue-300`}
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
        )}
        <RenderUser
          user={user}
          userData={userData}
          monthData={monthData}
          getUserAgain={getUserAgain}
        />
        <ConfigUser userData={userData} />
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;
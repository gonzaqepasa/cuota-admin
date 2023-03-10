import { MouseEvent, useState } from "react";
import { typesMonth, typesUser } from "../../types/types-user";
import styles from "./User.module.scss";
import Swal from "sweetalert2";
import { auth } from "../../../firebase/firebaseConfig";

import { payMonth } from "../../logic/payMonth";
import { orderByMonth } from "../../logic/orderByMonthName";
import { Description } from "./Description/Description";
import { selectColor } from "../../logic/selectColor";
import { fromNameToUrl } from "../../logic/fromNameToUrl";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import { url } from "../../config/services-url";
import { numberToMoney } from "../../logic/numberToMoney";
import Link from "next/link";
import { LinkDeptor } from "../Deptor/LinkDeptor/LinkDeptor";
import { NameUser } from "./NameUser/NameUser";
import { RenderUser } from "./Render/RenderUser";
import { ConfigUser } from "./Config/ConfigUser";

interface Props {
  userData: typesUser;
  id: string;
}

export const User: React.FC<Props> = ({ userData, id }) => {
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
        className={`${styles.allUserComponent} backg backg-${fromNameToUrl(
          userData.activity.nameActivity.toLowerCase()
        )} ${!user.active && styles.isInactiveUser}`}
      >
        <NameUser user={user} />
        <Description
          id={Number(id)}
          color={selectColor(user.activity.nameActivity)}
          description={user.description}
          getDataAgain={getUserAgain}
        />
        <RenderUser
          user={user}
          userData={userData}
          monthData={monthData}
          getUserAgain={getUserAgain}
        />
        <ConfigUser userData={userData}  />
      </div>
    );
  return <div>No existe este usuario</div>;
};

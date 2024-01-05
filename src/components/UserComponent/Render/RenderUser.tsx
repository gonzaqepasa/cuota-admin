import { typesMonth, typesUser } from "../../../types/types-user";
import CardMonth from "./Card/CardMonth";

interface Props {

  user: any;
  userData: typesUser;
  getUserAgain: () => void;
}

export const RenderUser: React.FC<Props> = ({
  user,

  userData,
  getUserAgain,
}) => {
  return (
    <div className={` min-w-96 w-4/6 backg-card-user rounded p-1 mb-16 `}>
      {/* {monthData.map((m, index) => (
        <CardMonth
          el={m}
          index={index}
          key={index}
          userData={userData}
          user={user}
          getUserAgain={getUserAgain}
        />
        /////////// -> end card
      ))} */}
    </div>
  );
  ///////////////////////////////////////////////////////////////////////
};

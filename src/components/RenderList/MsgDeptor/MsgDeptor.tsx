import { typesUser } from "../../../types/types-user";
import { mesActual } from "../../Deptor/logic/moths.d";

interface Props {
  user: typesUser;
  month: string;
}
export const MsgDeptor: React.FC<Props> = ({ user, month }) => {
  const aux = user.calendar.months.find((m) => {
    return m.monthName === month;
  });
  // console.log(aux, "asdasdasdasdasdasd");

  if (aux?.isPay === false) {
    return (
      <p
        className={`flex  text-xs text-neutral-400 h-2 w-2  rounded-lg bg-red-800`}
      ></p>
    );
  } else {
    return (
      <p className={`flex px-3 text-xs text-white font-extralight  rounded-lg bg-green-700`}>
        pagó
      </p>
    );
  }
};

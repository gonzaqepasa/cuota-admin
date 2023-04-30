import { typesUser } from "../../../types/types-user";
import { mesActual } from "../../Deptor/logic/moths.d";

interface Props {
  user: typesUser;
}
export const MsgDeptor: React.FC<Props> = ({ user }) => {
  const aux = user.calendar.months.find((m) => {
    return m.monthName === mesActual();
  });
  console.log(aux, "asdasdasdasdasdasd");

  return (
    <p
      className={`${
        aux?.isPay === false ? "flex" : "hidden"
      } px-3 text-xs text-white   rounded-lg bg-red-700`}
    >
      no pago
    </p>
  );
};

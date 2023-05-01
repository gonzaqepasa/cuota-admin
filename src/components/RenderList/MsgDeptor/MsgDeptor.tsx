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

  if (aux?.isPay === false) {
    return (
      <p className={`"flex" px-3 text-xs text-neutral-400   rounded-lg bg-neutral-700`}>
        no pago
      </p>
    );
  } else {
    return (
      <p className={`"flex" px-3 text-xs text-white   rounded-lg bg-green-700`}>
        pago
      </p>
    );
  }
};

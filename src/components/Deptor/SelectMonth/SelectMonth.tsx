import { arrayMonth } from "../../../config/moths";

import { Dispatch, SetStateAction } from "react";
import { typesMonthNames } from "../../../types/types-user";

interface Props {
  monthSelected: typesMonthNames;
  setMonthSelected: Dispatch<SetStateAction<typesMonthNames>>;
}
export const SelectMonth: React.FC<Props> = ({
  monthSelected,
  setMonthSelected,
}) => {
  return (
    <div className={``}>
      <select
        className={`bg-neutral-900 transition text-neutral-300 text-sm border border-neutral-400 px-2 rounded hover:bg-neutral-800`}
        disabled={false}
        value={monthSelected}
        onChange={(e: any) => setMonthSelected(e.target.value)}
        name=""
        id=""
      >
        <option value={arrayMonth[0]}>Enero</option>
        <option value={arrayMonth[1]}>Febrero</option>
        <option value={arrayMonth[2]}>Marzo</option>
        <option value={arrayMonth[3]}>Abril</option>
        <option value={arrayMonth[4]}>Mayo</option>
        <option value={arrayMonth[5]}>Junio</option>
        <option value={arrayMonth[6]}>Julio</option>
        <option value={arrayMonth[7]}>Agosto</option>
        <option value={arrayMonth[8]}>Septiembre</option>
        <option value={arrayMonth[9]}>Octubre</option>
        <option value={arrayMonth[10]}>Noviembre</option>
        <option value={arrayMonth[11]}>Diciembre</option>
      </select>
    </div>
  );
};

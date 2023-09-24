import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { typesMonthNames, typesUser } from "../../../types/types-user";
import { arrayMonth, dateMonth, mesActual } from "../../Deptor/logic/moths.d";
import { SelectMonth } from "../../Deptor/SelectMonth/SelectMonth";

interface Props {
  monthSelected: typesMonthNames;
  setMonthSelected: Dispatch<SetStateAction<typesMonthNames>>;
  setResultFilter: Dispatch<SetStateAction<[] | typesUser[]>>;
  result: [] | typesUser[];
  search: string;
}

export const FilterList: React.FC<Props> = ({
  monthSelected,
  setMonthSelected,
  setResultFilter,
  result,
  search,
}) => {
  /////////////////////////////////////////////////////////
  // const storageName = "filterOn";
  // const storageFilter = localStorage.getItem(storageName);
  // const storageData = {
  //   filterOn: !filterOn,
  // };
  // useEffect(() => {
  //   storageFilter && setFilterOn(JSON.parse(storageFilter).filterOn);
  //   console.log(filterOn);
  // }, []);

  // const handleClick = () => {
  //   setFilterOn(!filterOn);
  //   localStorage.setItem(storageName, JSON.stringify(storageData));
  // };
  /////////////////////////////////////////////////////////
  type filterType = "todos" | "pagado" | "sin pagar";
  const [state, setState] = useState<filterType>("todos");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const value = target.value as filterType;
    setState(value);
    // console.log(value);
  };

  useEffect(() => {
    // console.log(state);

    if (state === "todos") {
      setResultFilter(result);
    } else if (state === "pagado") {
      setResultFilter(
        result.filter((user) => {
          return user.calendar.months.find((m) => {
            return m.monthName === monthSelected && m.isPay === true;
          });
        })
      );
    } else if (state === "sin pagar") {
      const res = result.filter((user) => {
        return user.calendar.months.find((m) => {
          return m.monthName === monthSelected && m.isPay === false;
        });
      });
      console.log(res);
      setResultFilter(res);
    }
  }, [state, result, monthSelected]);

  return (
    <div className={`  flex flex-wrap items-center justify-center`}>
      <div
        className={` border border-neutral-400 m-3  bg-neutral-900 rounded  flex`}
      >
        <button
          onClick={(e) => handleClick(e)}
          value={"todos"}
          className={`border-none transition px-2 w-20 text-sm   rounded-l ${
            state === "todos"
              ? "bg-neutral-300 text-neutral-800 hover:text-neutral-900 hover:bg-neutral-200"
              : "text-neutral-400               hover:bg-neutral-800"
          }`}
        >
          Todos
        </button>
        <button
          onClick={(e) => handleClick(e)}
          value={"pagado"}
          className={` border-none  transition px-2 w-20 text-sm  ${
            state === "pagado"
              ? "bg-green-700 text-neutral-200 "
              : "text-neutral-400 hover:bg-neutral-800"
          }`}
        >
          Pagos
        </button>
        <button
          onClick={(e) => handleClick(e)}
          value={"sin pagar"}
          className={`transition rounded-r px-2 w-25 text-sm  ${
            state === "sin pagar"
              ? "bg-red-700 hover:bg-red-700 text-neutral-200"
              : "text-neutral-400 hover:bg-neutral-800"
          }`}
        >
          Sin pagar
        </button>
      </div>
      <div>
        <SelectMonth
          monthSelected={monthSelected}
          setMonthSelected={setMonthSelected}
        />
      </div>
    </div>
  );
};

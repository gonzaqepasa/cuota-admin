import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { typesMonthNames, typesUser } from "../../../types/types-user";
import { arrayMonth, dateMonth, mesActual } from "../../../config/moths";
import { SelectMonth } from "./SelectMonth/SelectMonth";
import { Tab, Tabs } from "@nextui-org/react";

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

  const handleClick = (e: any) => {
    if (e === "$.0") setState("todos");
    if (e === "$.1") setState("pagado");
    if (e === "$.2") setState("sin pagar");
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
    <div className={`  flex gap-1 p-2 flex-wrap items-center justify-center`}>
      <Tabs variant="bordered"  color="primary" onSelectionChange={(e) => handleClick(e)}>
        <Tab onClick={(e) => handleClick(e)} value={"todos"} title="Todos" />

        <Tab onClick={(e) => handleClick(e)} value={"pagado"} title="Pagos" />

        <Tab
          onClick={(e) => handleClick(e)}
          value={"sin pagar"}
          title="Sin pagar"
        />
      </Tabs>

      <SelectMonth
        monthSelected={monthSelected}
        setMonthSelected={setMonthSelected}
      />
    </div>
  );
};

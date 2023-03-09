import { Dispatch, SetStateAction, useState } from "react";
import { typesMonthNames } from "../../../types/types-user";
import { arrayMonth, dateMonth } from "../../Deptor/logic/moths.d";
import { SelectMonth } from "../../Deptor/SelectMonth/SelectMonth";
import styles from "./FilterList.module.scss";

interface Props {
  monthSelected: typesMonthNames;
  setMonthSelected: Dispatch<SetStateAction<typesMonthNames>>;
  filterOn: boolean;
  setFilterOn: Dispatch<SetStateAction<boolean>>;
}

export const FilterList: React.FC<Props> = ({
  monthSelected,
  setMonthSelected,
  filterOn,
  setFilterOn,
}) => {
  return (
    <div className={`${styles.allFilterList} `}>
      <div className={styles.textContainer}>
        <input
          className={`${styles.checkbox}`}
          type="checkbox"
          checked={filterOn}
          onChange={() => setFilterOn(!filterOn)}
        />
        <p
          onClick={() => setFilterOn(!filterOn)}
          className={`${!filterOn && styles.filterDisabled}`}
        >
          Mostrar solo los que deben el mes :
        </p>
      </div>
      <div
        className={`${styles.filterContainer} ${
          !filterOn && styles.filterDisabled
        }`}
      >
        <SelectMonth
          filterOn={filterOn}
          monthSelected={monthSelected}
          setMonthSelected={setMonthSelected}
        />
      </div>
    </div>
  );
};

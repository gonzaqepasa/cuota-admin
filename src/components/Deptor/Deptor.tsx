import { typesMonthNames } from "../../types/types-user";
import styles from "./Deptor.module.scss";
import { arrayMonth } from "./logic/moths";
import { Dispatch, SetStateAction } from "react";
import { SelectMonth } from "./SelectMonth/SelectMonth";
import { RenderDeptor } from "./Render/RenderDeptor";
import { TitleDeptor } from "./Title/TitleDeptor";

interface Props {
  dataMonths: any;
  monthSelected: typesMonthNames;
  setMonthSelected: Dispatch<SetStateAction<typesMonthNames>>;
}

export const Deptor: React.FC<Props> = ({
  dataMonths,
  monthSelected,
  setMonthSelected,
}) => {
  return (
    <div className={styles.allDeptor}>
      <TitleDeptor />
      <SelectMonth
        monthSelected={monthSelected}
        setMonthSelected={setMonthSelected}
      />
      <RenderDeptor dataMonths={dataMonths} />
    </div>
  );
};

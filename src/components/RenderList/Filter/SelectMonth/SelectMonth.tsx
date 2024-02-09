import { typesMonthNames } from "../../../../types/types-user";
import { arrayMonth } from "../../../../config/moths.d";

import { Dispatch, SetStateAction } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { arrayWithNamesMonths } from "../../../../config/infoMonths";

interface Props {
  monthSelected: typesMonthNames;
  setMonthSelected: any;
}
export const SelectMonth: React.FC<Props> = ({
  monthSelected,
  setMonthSelected,
}) => {
  return (
    <div className={`w-32 h-full`}>
      <Select
        size="sm"
        onSelectionChange={(e: any) => setMonthSelected(e.currentKey)}
        value={monthSelected}
        placeholder={monthSelected}
        color="primary"
        variant="faded"
        defaultSelectedKeys={[monthSelected]}
      >
        {arrayWithNamesMonths.map((m) => (
          <SelectItem color="primary" variant="solid" key={m.name} value={m.name}>
            {m.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

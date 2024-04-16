import { Select, SelectItem } from "@nextui-org/react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { typesActivity } from "../../../../types/types-user";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";

interface Props {
  setName: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  activities: typesActivity[];
  forCreate: 0 | 1;
}
const SelectActivityToCreate: React.FC<Props> = ({
  setName,
  setColor,
  activities,
  forCreate,
}) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    const act = activities.find((a) => String(a._id) === e.target.value);
    if (act) {
      setName(act.nameActivity);
      setColor(act.color);
    }
  };

  return (
    <>
      <Select
        onChange={(e) => onChange(e)}
        aria-label="Seleceted"
        label={"Selecciones una actividad"}
        variant="underlined"
        color="primary"
      >
        {activities.map((e: typesActivity) => (
          <SelectItem color="primary" key={e._id} value={e._id}>
            {firstLetterUpper(e.nameActivity)}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default SelectActivityToCreate;

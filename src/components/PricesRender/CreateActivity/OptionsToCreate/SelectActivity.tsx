import { Select, SelectItem } from "@nextui-org/react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getAllActivities } from "../../../../api-next/getActivity";
import { typesActivity } from "../../../../types/types-user";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";

interface Props {
  setName: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  activities:typesActivity[]
}
const SelectActivityToCreate: React.FC<Props> = ({ setName, setColor,activities }) => {
  


  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    const act = activities.find((a) => String(a.id) === e.target.value);
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
        variant="bordered"
        color="primary"

      >
        {activities.map((e: typesActivity) => (
          <SelectItem color="primary" key={e.id} value={e.id}>
            {firstLetterUpper(e.nameActivity)}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default SelectActivityToCreate;

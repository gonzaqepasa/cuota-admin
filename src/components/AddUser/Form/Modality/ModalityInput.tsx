import { Select, SelectItem } from "@nextui-org/react";
import { selectColor } from "../../../../logic/selectColor";
import { type typesActivity } from "../../../../types/types-user";
import { Dispatch, SetStateAction } from "react";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";

interface Props {
  setActivity: Dispatch<SetStateAction<string | null>>;
  dataActivity: typesActivity[];
  activity: string | null;
}

export const ModalityInput: React.FC<Props> = ({
  dataActivity,
  setActivity,
  activity,
}) => {
  function handleSelect(e: string) {
    setActivity(e);
    console.log(e);
  }
  console.log(dataActivity);
  return (
    <Select
      className={` `}
      onChange={(e) => handleSelect(e.target.value)}
      name="activity"
      id=""
      color="primary"
      variant="bordered"
      label={"Modalidad"}
      errorMessage={!activity && "Selecciones modalidad"}
    >
      {dataActivity.map((el: typesActivity) => (
        <SelectItem color="primary" variant="solid" key={el._id} value={el._id}>
          {firstLetterUpper(el.modality)}
        </SelectItem>
      ))}
    </Select>
  );
};

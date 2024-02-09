import { Select, SelectItem } from "@nextui-org/react";
import { selectColor } from "../../../../logic/selectColor";
import { type typesActivity } from "../../../../types/types-user";
import { handleSelect } from "../../logic/handle-functions";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setActivity: Dispatch<SetStateAction<number>>;
  dataActivity: typesActivity[];
}

export const ModalityInput: React.FC<Props> = ({
  dataActivity,
  setActivity,
}) => {
  console.log(dataActivity);
  return (
    <Select
      className={` `}
      onChange={(e) => handleSelect(e.target.value, setActivity)}
      name="activity"
      id=""
      color="primary"
      variant="bordered"
      label={"Modalidad"}
      placeholder={dataActivity[0].modality}
      defaultSelectedKeys={dataActivity[0].modality}
      style={{ color: selectColor(dataActivity[0].nameActivity) }}
    >
      {dataActivity.map((el: typesActivity) => (
        <SelectItem
          color="primary"
          variant="solid"
          key={el.id}
          value={el.modality}
        >
          {el.modality}
        </SelectItem>
      ))}
    </Select>
  );
};

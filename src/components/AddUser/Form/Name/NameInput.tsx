import { Dispatch, SetStateAction } from "react";
import { selectColor } from "../../../../logic/selectColor";
import { typesActivity } from "../../../../types/types-user";
import { Input } from "@nextui-org/react";

interface Props {
  setName: Dispatch<SetStateAction<string>>;
  dataActivity: typesActivity[];
  nameVal: { val: boolean; msg: string };
}

export const NameInput: React.FC<Props> = ({
  setName,
  dataActivity,
  nameVal,
}) => {
  return (
    <Input
      autoComplete="none"
      placeholder="Ingrese nombre..."
      label="Nombre"
      onChange={(e) => setName(e.target.value)}
      name="name"
      // style={{ color: selectColor(dataActivity[0].nameActivity) }}
      isInvalid={nameVal.val}
      color={nameVal.val ? "danger" : "primary"}
      variant="bordered"
      errorMessage={nameVal.val}
    />
  );
};

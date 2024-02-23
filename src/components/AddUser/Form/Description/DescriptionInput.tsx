import { Dispatch, SetStateAction } from "react";
import { selectColor } from "../../../../logic/selectColor";
import { type typesActivity } from "../../../../types/types-user";
import { Textarea } from "@nextui-org/react";

interface Props {
  setDescription: Dispatch<SetStateAction<string>>;
  dataActivity: typesActivity[];
}

export const DescriptionInput: React.FC<Props> = ({
  setDescription,
  dataActivity,
}) => {
  return (
    <Textarea
      className={` `}
      placeholder="Ingrese alguna descripción..."
      autoComplete="none"
      label="Descripción"
      variant="bordered"
   
      color="primary"
      onChange={(e) => setDescription(e.target.value)}
      name="description"
    />
  );
};

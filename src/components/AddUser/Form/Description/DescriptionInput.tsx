import { Dispatch, SetStateAction } from "react";
import { selectColor } from "../../../../logic/selectColor";
import { type typesActivity } from "../../../../types/types-user";
import { Textarea } from "@nextui-org/react";

interface Props {
  setDescription: Dispatch<SetStateAction<string>>;
}

export const DescriptionInput: React.FC<Props> = ({ setDescription }) => {
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

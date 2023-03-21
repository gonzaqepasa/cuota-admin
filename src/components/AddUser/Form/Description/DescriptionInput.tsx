import { Dispatch, SetStateAction } from "react";
import { selectColor } from "../../../../logic/selectColor";
import { type typesActivity } from "../../../../types/types-user";

interface Props {
  setDescription: Dispatch<SetStateAction<string>>;
  dataActivity: typesActivity[];
}

export const DescriptionInput: React.FC<Props> = ({
  setDescription,
  dataActivity,
}) => {
  return (
    <div className={`flex flex-col my-1`}>
      <label
      className="text-gray-400 text-sm"
      // style={{ color: selectColor(dataActivity[0].nameActivity) }}
      >
        Descripcion
      </label>
      <textarea
        className={`bg-neutral-800 rounded-md p-1 font-normal text-sm `}
        style={{ color: selectColor(dataActivity[0].nameActivity) ,minHeight: "50px" }}
        placeholder="Ingrese alguna descripción..."
        autoComplete="none"
        onChange={(e) => setDescription(e.target.value)}
        name="number"
      />
    </div>
  );
};

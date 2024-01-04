import { selectColor } from "../../../../logic/selectColor";
import { type typesActivity } from "../../../../types/types-user";
import { handleSelect } from "../../logic/handle-functions";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setActivity: Dispatch<SetStateAction<string|undefined>>;
  dataActivity?: typesActivity[];
}

export const ModalityInput: React.FC<Props> = ({
  dataActivity,
  setActivity,
}) => {
  return (
    <div className={`flex flex-col my-1 `}>
      <label
        className="text-gray-400 text-sm "
        // style={{ color: selectColor(dataActivity[0].nameActivity) }}
        htmlFor=""
      >
        Modalidad
      </label>
      <select
        className={` bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 focus:outline rounded-md p-1 font-normal text-sm`}
        onChange={(e) => handleSelect(e.target.value, setActivity)}
        name="activity"
        id=""
      >
        {dataActivity?.map((el: typesActivity) => (
          <option key={el._id} value={el._id}>
            {el.modality}
          </option>
        ))}
      </select>
    </div>
  );
};

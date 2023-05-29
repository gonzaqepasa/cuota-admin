import { Dispatch, SetStateAction } from "react";
import { selectColor } from "../../../../logic/selectColor";
import { typesActivity } from "../../../../types/types-user";

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
    <div className={`flex flex-col my-1 `} id="name">
      <label
        className="text-gray-400 text-sm "
        //  style={{ color: selectColor(dataActivity[0].nameActivity) }}
      >
        Nombre y apellido <i style={{ color: "red" }}>*</i>
      </label>
      <input
        autoComplete="none"
        placeholder="Ingrese nombre..."
        // className={`${nameVal.val && styles.nameValInput}`}
        className={`${
          nameVal.val && "border border-red-600"
        }  rounded-md  bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 focus:outline text-sm p-2 font-normal`}
        onChange={(e) => setName(e.target.value)}
        name="name"
        style={{ color: selectColor(dataActivity[0].nameActivity) }}
      />
      <i className={`${nameVal.val && "text-red-600 font-light text-xs"}`}>
        {nameVal.msg}
      </i>
    </div>
  );
};

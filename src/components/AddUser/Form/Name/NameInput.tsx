import { Dispatch, SetStateAction } from "react";
import { selectColor } from "../../../../logic/selectColor";
import { typesActivity, typesUser } from "../../../../types/types-user";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { firstLetterUpper } from "../../../../logic/firstLetterUpper";

interface Props {
  setName: Dispatch<SetStateAction<string>>;

  nameVal: string;
  userData?: typesUser[];
}

export const NameInput: React.FC<Props> = ({
  setName,

  userData,
  nameVal,
}) => {
  const exists = userData?.find((user) =>
    user.name.includes(nameVal.toLowerCase().trim())
  );
  console.log("esto es existe aconchesumadre", exists);
  return (
    <div className=" text-content1-300">
      <Input
        autoComplete="none"
        placeholder="Ingrese nombre..."
        label="Nombre"
        onChange={(e) => setName(e.target.value)}
        name="name"
        value={nameVal}
        // style={{ color: selectColor(dataActivity[0].nameActivity) }}
        // isInvalid={nameVal.val}
        color={"primary"}
        variant="bordered"
        // errorMessage={nameVal.val}
      />
      {exists && nameVal.length > 8 && (
        <Link
          // style={{ backgroundColor: dataActivity[0].color}}
          className="font-semibold text-xs flex items-center gap-1  hover:opacity-80  transition-colors rounded-lg p-1 "
          href={`/user/${exists._id}`}
        >
          Ya existe un usuario con el nombre,
          <p>{` ${firstLetterUpper(exists.name)}`}</p> ir al perfil
        </Link>
      )}
    </div>
  );
};

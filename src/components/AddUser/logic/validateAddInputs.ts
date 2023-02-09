import { Dispatch, SetStateAction } from "react";
import { typesUser } from "../../../types/types-user";
import { useRouter } from "next/router";

type typeCbNameVal = Dispatch<SetStateAction<{ val: boolean; msg: string }>>;
export function validateFormInputs(
  name: string,
  setNameVal: typeCbNameVal,
 
): boolean {
  if (name.length < 4) {
    setNameVal({
      val: true,
      msg: "El nombre debe ser mayor a 3 letras",
    });
   
    return false;
  } else {
    setNameVal({
      val: false,
      msg: "",
    });
    return true;
  }
}

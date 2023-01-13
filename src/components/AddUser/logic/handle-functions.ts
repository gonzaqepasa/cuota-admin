import { Dispatch, SetStateAction } from "react";
import { typesActivityGym } from "../../../../pages/gym";
import { typesUser } from "../../../types/types-user";


export function handleSelect(e: string, cbSet: Dispatch<SetStateAction<any>>) {
  cbSet(Number(e));
  console.log(e);
}

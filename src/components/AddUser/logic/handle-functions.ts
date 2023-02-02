import { Dispatch, SetStateAction } from "react";

export function handleSelect(e: string, cbSet: Dispatch<SetStateAction<any>>) {
  cbSet(Number(e));
  console.log(e);
}

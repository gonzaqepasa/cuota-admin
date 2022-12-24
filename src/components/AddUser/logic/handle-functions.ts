import { Dispatch, SetStateAction } from "react";
import { typesActivityGym } from "../../../../pages/gym";
import { typesUser } from "../../../types/types-user";

type typesActivity = Pick<typesUser, "activity">;
export function handleSelect(e: string, cbSet: Dispatch<SetStateAction<any>>) {
  cbSet(function (state: SetStateAction<any>) {
    return { ...state, modality: e };
  });
  console.log(e);
}

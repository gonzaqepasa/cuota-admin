import { Dispatch, SetStateAction } from "react";
import { Input } from "@nextui-org/react";
import Cookies from "js-cookie";

interface Props {
  setPhone: Dispatch<SetStateAction<string>>;
}

export const PhoneInput: React.FC<Props> = ({ setPhone }) => {
  return (
    <Input
      className={`text-content1-300 `}
      type="number"
      placeholder="Ingrese número de telefono"
      autoComplete="none"
      label="Numero de telefono"
      variant="bordered"
      color="primary"
      startContent={
        <p className={`text-sm  pr-1 text-content1-200`}>{"+54"}</p>
      }
      onChange={(e) => setPhone(e.target.value)}
      name="description"
    />
  );
};

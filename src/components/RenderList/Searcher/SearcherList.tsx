import styles from "./SearcherList.module.scss";
import { ImSearch } from "react-icons/im";
import { typesUser } from "../../../types/types-user";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";
import { Input } from "@nextui-org/react";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const SearcherList: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <Input
      isClearable
      onClear={() => setSearch("")}
      placeholder="Buscar..."
      startContent={<ImSearch className="mr-2" size={15} />}
      value={search}
      className="max-w-xs"
      variant="bordered"
      color="primary"
      name="search"
      autoComplete="none"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

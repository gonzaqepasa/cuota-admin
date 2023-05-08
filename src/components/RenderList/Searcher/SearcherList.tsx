import styles from "./SearcherList.module.scss";
import { ImSearch } from "react-icons/im";
import { typesUser } from "../../../types/types-user";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const SearcherList: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className={`flex py-3`}>
      <div className={`flex items-center bg-neutral-300 rounded `}>
        <input
          className={`bg-transparent placeholder-neutral-800 transition rounded  text-sm text-neutral-800  px-2 py-1 focus:bg-neutral-400 outline-none w-40`}
          placeholder="Buscar..."
          value={search}
          name="search"
          autoComplete="none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={`mx-2`}>
          {search.length > 0 ? (
            <FiX size={13} onClick={() => setSearch("")} />
          ) : (
            <ImSearch size={13} />
          )}
        </div>
      </div>
    </div>
  );
};
